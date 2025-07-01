import { Schema, model, Document } from 'mongoose';

interface WishlistDocument extends Document {
  userId: Schema.Types.ObjectId;
  products: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const WishlistSchema = new Schema<WishlistDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

export const Wishlist = model<WishlistDocument>('Wishlist', WishlistSchema);