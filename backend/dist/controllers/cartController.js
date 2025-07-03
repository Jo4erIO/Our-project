"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCart = exports.removeFromCart = exports.addToCart = void 0;
const Cart_1 = require("../models/Cart");
const mongoose_1 = __importDefault(require("mongoose"));
// Валидация ObjectId
const isValidId = (id) => mongoose_1.default.Types.ObjectId.isValid(id);
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity = 1 } = req.body;
        if (!isValidId(productId) || !isValidId(userId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const cart = await Cart_1.Cart.findOneAndUpdate({ userId }, {
            $addToSet: {
                items: {
                    productId: new mongoose_1.default.Types.ObjectId(productId),
                    quantity
                }
            }
        }, { new: true, upsert: true }).populate('items.productId');
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add to cart' });
    }
};
exports.addToCart = addToCart;
const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        if (!isValidId(productId) || !isValidId(userId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const cart = await Cart_1.Cart.findOneAndUpdate({ userId }, { $pull: { items: { productId: new mongoose_1.default.Types.ObjectId(productId) } } }, { new: true }).populate('items.productId');
        res.status(200).json(cart || { items: [] });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to remove from cart' });
    }
};
exports.removeFromCart = removeFromCart;
const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart_1.Cart.findOne({ userId }).populate('items.productId');
        res.status(200).json(cart || { items: [] });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
};
exports.getCart = getCart;
