"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// Вспомогательная функция для преобразования строки в секунды
function parseExpiresIn(expiresIn) {
    // Для значений без суффикса (просто число)
    if (/^\d+$/.test(expiresIn)) {
        return parseInt(expiresIn, 10);
    }
    // Для значений с суффиксом
    const value = parseInt(expiresIn, 10);
    const unit = expiresIn.replace(value.toString(), '').toLowerCase();
    switch (unit) {
        case 's': return value; // секунды
        case 'm': return value * 60; // минуты
        case 'h': return value * 60 * 60; // часы
        case 'd': return value * 60 * 60 * 24; // дни
        default: return 3600; // 1 час по умолчанию
    }
}
// Регистрация нового пользователя
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Проверка на существующего пользователя
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
        }
        if (!email || !password) {
            return res.status(400).json({ message: 'Email и пароль обязательны' });
        }
        // Хеширование пароля
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        // Создание нового пользователя
        const newUser = new User_1.default({
            email,
            password: hashedPassword
        });
        // Сохранение пользователя в БД
        const savedUser = await newUser.save();
        // Определение времени истечения токена
        const expiresIn = process.env.TOKEN_EXPIRES_IN || '1000h';
        const expiresInSeconds = parseExpiresIn(expiresIn);
        // Генерация JWT токена
        const token = jsonwebtoken_1.default.sign({ userId: savedUser._id.toString() }, process.env.JWT_SECRET, { expiresIn: expiresInSeconds });
        // Установка токена в куки
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: expiresInSeconds * 1000, // в миллисекундах
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        });
        // Ответ с токеном и данными пользователя
        res.status(201).json({
            token,
            user: {
                id: savedUser._id,
                email: savedUser.email
            }
        });
    }
    catch (error) {
        console.error('Ошибка регистрации:', error);
        res.status(500).json({ message: 'Ошибка сервера при регистрации' });
    }
};
exports.register = register;
// Авторизация пользователя
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Поиск пользователя
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Неверные учетные данные' });
        }
        // Проверка пароля
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Неверные учетные данные' });
        }
        // Определение времени истечения токена
        const expiresIn = process.env.TOKEN_EXPIRES_IN || '1h';
        const expiresInSeconds = parseExpiresIn(expiresIn);
        // Генерация JWT токена
        const token = jsonwebtoken_1.default.sign({ userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: expiresInSeconds });
        // Установка токена в куки
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: expiresInSeconds * 1000, // в миллисекундах
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        });
        // Ответ с токеном и данными пользователя
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });
    }
    catch (error) {
        console.error('Ошибка авторизации:', error);
        res.status(500).json({ message: 'Ошибка сервера при авторизации' });
    }
};
exports.login = login;
