const mongoose=require('mongoose')
const BlokSchema=require('../schemas/blok.schema')

const BlokModel = mongoose.model('Bloks', BlokSchema);

module.exports=BlokModel;