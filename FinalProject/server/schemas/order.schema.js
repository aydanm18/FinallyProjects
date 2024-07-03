const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  username: String,
  email: String,
  totalPrice: { type: Number, required: true },
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menues', required: true },
    count: { type: Number, required: true },
    itemName: { type: String, required: true },
    itemImg: { type: String, required: true }
  }],
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  formFields: {
    firstname: String,
    lastname: String,
    companyname: String,
    phoneno: String,
    streetnum: String,
    zip: String,
    country: String,
    apartment: String,
    town: String,
    message: String,
  }
}, { timestamps: true, versionKey: false });

module.exports = OrderSchema;
