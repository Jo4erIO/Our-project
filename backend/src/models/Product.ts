import { Schema, model, Document } from 'mongoose';

interface ProductDocument extends Document {
  name: string;
  price: number;
  images: string[];
  discount?: number;
  rating?: number;
  colors?: string[];
  description?: string;
  category?: string;
  stock?: number;
  specifications?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    price: { 
      type: Number, 
      required: true,
      min: 0
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: (images: string[]) => images.length > 0,
        message: 'At least one image is required'
      }
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    colors: {
      type: [String],
      default: []
    },
    description: String,
    category: String,
    stock: {
      type: Number,
      min: 0,
      default: 0
    },
    specifications: {
      type: Map,
      of: String
    }
  },
  { 
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      }
    }
  }
);

// Индексы для быстрого поиска
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ price: 1 });

export const Product = model<ProductDocument>('Product', ProductSchema);