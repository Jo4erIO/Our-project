"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartController_1 = require("../controllers/cartController");
const router = (0, express_1.Router)();
router.post('/:userId/items', cartController_1.addToCart);
router.delete('/', cartController_1.removeFromCart);
router.get('/:userId', cartController_1.getCart);
exports.default = router;
