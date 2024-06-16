const mongoose=require('mongoose');

const TeamSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
}, { timestamps: true, versionKey: false });

module.exports=TeamSchema