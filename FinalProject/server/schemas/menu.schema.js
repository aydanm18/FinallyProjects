const mongoose=require('mongoose');

const MenuSchemas = new mongoose.Schema(
    {
        title: String,
        description: String,
        image: String,
        price: String,
        category: String,
        comments: Array,
        likes: {
            type: Array,
            default: [],
          },

    },
    { timestamps: true, versionKey: false }
);

module.exports = MenuSchemas