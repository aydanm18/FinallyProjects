const mongoose=require('mongoose')
const TeamSchema=require('../schemas/team.schema')

const TeamModel = mongoose.model('Teams', TeamSchema);

module.exports=TeamModel;