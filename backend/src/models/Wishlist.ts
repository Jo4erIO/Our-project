import { Schema, model, Document } from 'mongoose';
import { Product } from './Product';
type ProductDocument = InstanceType<typeof Product>;

interface WishlistDocument extends Document {
  userId: Schema.Types.ObjectId;
  products: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const WishlistSchema = new Schema<WishlistDocument>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      unique: true,
      index: true
    },
    products: [{
      type: Schema.Types.ObjectId, 
      ref: 'Product',
      required: true,
      index: true
    }],
  },
  { 
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.userId;
        return ret;
      }
    }
  }
);

export const Wishlist = model<WishlistDocument>('Wishlist', WishlistSchema);