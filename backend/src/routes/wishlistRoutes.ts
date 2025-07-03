import { Router } from 'express';
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist
} from '../controllers/wishlistController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// Все эндпоинты используют аутентификацию
router.use(authenticate);

// POST /api/wishlist - Добавить в избранное
router.post('/', addToWishlist);

// DELETE /api/wishlist - Удалить из избранного
router.delete('/:id', removeFromWishlist);

// GET /api/wishlist - Получить избранное пользователя
router.get('/', getWishlist);

export default router;