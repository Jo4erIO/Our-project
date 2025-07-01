import { Router } from 'express';
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist
} from '../controllers/wishlistController';

const router = Router();

router.post('/', addToWishlist);
router.delete('/', removeFromWishlist);
router.get('/:userId', getWishlist);

export default router;