import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: mongoose.Types.ObjectId;
        email: string;
      };
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    console.log('Decoded token data:', decoded);
    
    // Ищем пользователя по ID из токена
    const user = await User.findOne({ _id: decoded.userId }).select('-password').lean();
    
    if (!user) {
      console.log('User not found for ID:', decoded.userId);
      return res.status(401).json({ error: 'Пользователь не найден' });
    }

    // Добавляем пользователя в объект запроса
    req.user = {
      _id: new mongoose.Types.ObjectId(user._id),
      email: user.email
    };
    
    console.log('Authenticated user:', req.user);
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    
    // Обработка различных ошибок верификации
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Срок действия токена истёк' });
    }
    
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Неверный токен' });
    }
    
    return res.status(401).json({ error: 'Ошибка аутентификации' });
  }
};