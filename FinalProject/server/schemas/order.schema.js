const mongoose=require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    totalPrice: Number,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: true, versionKey: false });
module.exports=OrderSchema