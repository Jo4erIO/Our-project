import { Request, Response } from 'express';
import { Cart } from '../models/Cart';
import mongoose from 'mongoose';

// Валидация ObjectId
const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;

    if (!isValidId(productId) || !isValidId(userId)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId },
      {
        $addToSet: { 
          items: { 
            productId: new mongoose.Types.ObjectId(productId), 
            quantity 
          } 
        }
      },
      { new: true, upsert: true }
    ).populate('items.productId');

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    if (!isValidId(productId) || !isValidId(userId)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId: new mongoose.Types.ObjectId(productId) } } },
      { new: true }
    ).populate('items.productId');

    res.status(200).json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    res.status(200).json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};