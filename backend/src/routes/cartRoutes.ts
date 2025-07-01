import { Router } from 'express';
import { addToCart, removeFromCart, getCart } from '../controllers/cartController';

const router = Router();

router.post('/:userId/items', addToCart);
router.delete('/', removeFromCart);
router.get('/:userId', getCart);

export default router;