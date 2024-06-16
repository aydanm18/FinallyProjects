const mongoose=require('mongoose')
const OrderSchema=require('../schemas/order.schema')

const OrderModel = mongoose.model('Orders', OrderSchema);

module.exports=OrderModel