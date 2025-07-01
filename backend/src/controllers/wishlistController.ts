import { Request, Response } from 'express';
import { Wishlist } from '../models/Wishlist';
import mongoose from 'mongoose';

const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    if (!isValidId(productId) || !isValidId(userId)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $addToSet: { products: new mongoose.Types.ObjectId(productId) } },
      { new: true, upsert: true }
    ).populate('products');

    res.status(200).json(wishlist);
  } catch (error) {
    console.error('Wishlist add error:', error);
    res.status(500).json({ error: 'Failed to update wishlist' });
  }
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    if (!isValidId(productId) || !isValidId(userId)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { products: new mongoose.Types.ObjectId(productId) } },
      { new: true }
    ).populate('products');

    res.status(200).json(wishlist || { products: [] });
  } catch (error) {
    console.error('Wishlist remove error:', error);
    res.status(500).json({ error: 'Failed to remove from wishlist' });
  }
};

export const getWishlist = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.findOne({ userId }).populate('products');
    res.status(200).json(wishlist || { products: [] });
  } catch (error) {
    console.error('Wishlist fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
};