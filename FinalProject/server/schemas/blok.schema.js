const mongoose=require('mongoose');

const BlokSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            default: "",
        },
        description: String,
        src: String,
        comments: Array,
    },
    { timestamps: true, versionKey: false }
);

module.exports=BlokSchema