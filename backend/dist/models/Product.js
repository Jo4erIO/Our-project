"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
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
            validator: (images) => images.length > 0,
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
}, {
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
});
// Индексы для быстрого поиска
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ price: 1 });
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
