import { Router, Request, Response, NextFunction } from 'express';
import { login, register } from '../controllers/authController';

const router: Router = Router();

// Тестовый роут для проверки работы API
router.get('/test', (req: Request, res: Response) => {
  res.json({ message: "API работает!" });
});

// Регистрация пользователя
router.post('/register', 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await register(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// Авторизация пользователя
router.post('/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await login(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default router;