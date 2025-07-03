"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wishlist = void 0;
const mongoose_1 = require("mongoose");
const WishlistSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
        index: true
    },
    products: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
            index: true
        }],
}, {
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
});
exports.Wishlist = (0, mongoose_1.model)('Wishlist', WishlistSchema);
