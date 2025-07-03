import { Request, Response } from 'express';
import { Wishlist } from '../models/Wishlist';
import { Product } from '../models/Product';
import mongoose from 'mongoose';

const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export const getWishlist = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ 
        success: false,
        error: 'Authentication required' 
      });
    }

    const wishlist = await Wishlist.findOne({ userId })
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
  } catch (error) {
    console.error('Wishlist error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Database error',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

export const addToWishlist = async (req: Request, res: Response) => {
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
    const productExists = await Product.exists({ _id: productId });
    if (!productExists) {
      return res.status(404).json({ 
        success: false,
        error: 'Product not found' 
      });
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $addToSet: { products: productId } },
      { 
        new: true,
        upsert: true,
        populate: {
          path: 'products',
          model: 'Product',
          select: '_id name price images discount rating colors'
        }
      }
    );

    res.status(200).json({
      success: true,
      products: wishlist?.products || []
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error while adding to wishlist',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    // Исправлено: получение productId из параметров запроса
    const productId = req.params.id;
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

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { products: productId } },
      { 
        new: true,
        populate: {
          path: 'products',
          model: 'Product',
          select: '_id name price images discount rating colors'
        }
      }
    );

    res.status(200).json({
      success: true,
      products: wishlist?.products || []
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error while removing from wishlist',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};