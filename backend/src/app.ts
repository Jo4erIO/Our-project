import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import cartRoutes from './routes/cartRoutes';
import wishlistRoutes from './routes/wishlistRoutes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import './models/User';
import './models/Product';
import './models/Wishlist';

dotenv.config();

const app = express();

// 1. Логирование запросов (первым)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  
  // Безопасная проверка req.body
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
    console.log('Request body:', req.body);
  }
  
  next();
});

// 2. CORS (вторым)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// 3. Cookie Parser
app.use(cookieParser());

// 4. Парсинг JSON
app.use(express.json());

// 5. Роуты
app.use('/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);

// MongoDB подключение
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB error:', err));

// Middleware для обработки ошибок (последним)
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;