"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wishlistController_1 = require("../controllers/wishlistController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Все эндпоинты используют аутентификацию
router.use(authMiddleware_1.authenticate);
// POST /api/wishlist - Добавить в избранное
router.post('/', wishlistController_1.addToWishlist);
// DELETE /api/wishlist - Удалить из избранного
router.delete('/', wishlistController_1.removeFromWishlist);
// GET /api/wishlist - Получить избранное пользователя
router.get('/', wishlistController_1.getWishlist);
exports.default = router;
