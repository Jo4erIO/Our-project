import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Подключаем парсинг JSON ПЕРВЫМ
app.use(express.json()); // <-- ДОЛЖНО БЫТЬ ПЕРВЫМ

// Затем CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Затем логирование запросов (после парсинга JSON)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  if (Object.keys(req.body).length > 0) {
    console.log('Request body:', req.body);
  }
  next();
});

// MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB error:', err));

// Routes
app.use('/auth', authRoutes);

// Middleware для обработки ошибок
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  con