const mongoose=require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  username:String,
  email:String,
  totalPrice: { type: Number, required: true },
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menues', required: true },
    count: { type: Number, required: true },
    itemName: { type: String, required: true }
  }]
}, { timestamps: true, versionKey: false });


module.exports=OrderSchema