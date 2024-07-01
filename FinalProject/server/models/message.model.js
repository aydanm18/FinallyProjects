const mongoose = require('mongoose')
const MessageSchema = require('../schemas/message.schema')

const MessageModel = mongoose.model('Messages', MessageSchema);

module.exports = MessageModel;