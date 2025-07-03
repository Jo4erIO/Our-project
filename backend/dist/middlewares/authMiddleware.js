"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const authenticate = async (req, res, next) => {
    // Получаем токен из разных источников
    const token = req.cookies?.token ||
        req.headers.authorization?.replace('Bearer ', '') ||
        req.body?.token;
    console.log('Auth middleware received token:', token);
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ error: 'Требуется авторизация' });
    }
    try {
        // Проверяем и декодируем токен
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token data:', decoded);
        // Ищем пользователя по ID из токена
        const user = await User_1.default.findOne({ _id: decoded.userId }).select('-password').lean();
        if (!user) {
            console.log('User not found for ID:', decoded.userId);
            return res.status(401).json({ error: 'Пользователь не найден' });
        }
        // Добавляем пользователя в объект запроса
        req.user = {
            _id: new mongoose_1.default.Types.ObjectId(user._id),
            email: user.email
        };
        console.log('Authenticated user:', req.user);
        next();
    }
    catch (err) {
        console.error('Token verification error:', err);
        // Обработка различных ошибок верификации
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ error: 'Срок действия токена истёк' });
        }
        if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).json({ error: 'Неверный токен' });
        }
        return res.status(401).json({ error: 'Ошибка аутентификации' });
    }
};
exports.authenticate = authenticate;
