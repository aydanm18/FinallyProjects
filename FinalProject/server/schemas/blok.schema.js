const mongoose=require('mongoose');

const BlokSchema = new mongoose.Schema(
    {
        title:String,
        description: String,
        src: String,
        comments: Array,
    },
    { timestamps: true, versionKey: false }
);

module.exports=BlokSchema