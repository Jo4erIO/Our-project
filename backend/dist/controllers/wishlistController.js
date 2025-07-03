"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromWishlist = exports.addToWishlist = exports.getWishlist = void 0;
const Wishlist_1 = require("../models/Wishlist");
const Product_1 = require("../models/Product");
const mongoose_1 = __importDefault(require("mongoose"));
const isValidId = (id) => mongoose_1.default.Types.ObjectId.isValid(id);
const getWishlist = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
        }
        const wishlist = await Wishlist_1.Wishlist.findOne({ userId })
            .populate({
            path: 'products',
            model: 'Product',
            select: '_id name price images discount rating colors'
        })
            .lean();
        // Всегда возвращаем массив продуктов
        res.status(200).json({
            success: true,
            products: wishlist?.products || []
        });
    }
    catch (error) {
        console.error('Wishlist error:', error);
        res.status(500).json({
            success: false,
            error: 'Database error',
            details: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};
exports.getWishlist = getWishlist;
const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
        }
        if (!productId || !isValidId(productId)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid product ID'
            });
        }
        // Проверяем существование продукта
        const productExists = await Product_1.Product.exists({ _id: productId });
        if (!productExists) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }
        const wishlist = await Wishlist_1.Wishlist.findOneAndUpdate({ userId }, { $addToSet: { products: productId } }, {
            new: true,
            upsert: true,
            populate: {
                path: 'products',
                model: 'Product',
                select: '_id name price images discount rating colors'
            }
        });
        res.status(200).json({
            success: true,
            products: wishlist?.products || []
        });
    }
    catch (error) {
        console.error('Add to wishlist error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error while adding to wishlist',
            details: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};
exports.addToWishlist = addToWishlist;
const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
        }
        if (!productId || !isValidId(productId)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid product ID'
            });
        }
        const wishlist = await Wishlist_1.Wishlist.findOneAndUpdate({ userId }, { $pull: { products: productId } }, {
            new: true,
            populate: {
                path: 'products',
                model: 'Product',
                select: '_id name price images discount rating colors'
            }
        });
        res.status(200).json({
            success: true,
            products: wishlist?.products || []
        });
    }
    catch (error) {
        console.error('Remove from wishlist error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error while removing from wishlist',
            details: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};
exports.removeFromWishlist = removeFromWishlist;
