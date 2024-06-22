const mongoose=require('mongoose')
const MenuSchemas=require('../schemas/menu.schema')

const MenuModel = mongoose.model('Menues', MenuSchemas);

module.exports=MenuModel;