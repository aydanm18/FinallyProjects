const mongoose=require('mongoose');

const MenuSchemas = new mongoose.Schema(
    {
        title: String,
        description: String,
        image: String,
        price: String,
        category: String,
    },
    { timestamps: true, versionKey: false }
);

module.exports = MenuSchemas