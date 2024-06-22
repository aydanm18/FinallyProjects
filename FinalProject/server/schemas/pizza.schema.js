const mongoose=require('mongoose');

const PizzaSchema = new mongoose.Schema(
    {
       image:String,
       title:String,
       description:String,
       price:Number
    },
    { timestamps: true, versionKey: false }
);

module.exports=PizzaSchema