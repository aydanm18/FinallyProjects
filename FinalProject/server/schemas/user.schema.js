const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        src: {
            type: String
        },
        role: {
            type: String,
            enum: ["admin", "client"]
        },
        basketItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BasketItem' }],
        wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WishlistItem' }],
        isVerified: {
            type: Boolean,
            default: false
        },
        balance: {
            type: Number,
            default: 0,
          },
    },
{ timestamps: true, versionKey: false }
);
module.exports = UserSchema