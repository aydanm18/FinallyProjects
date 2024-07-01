const express = require('express')
const endpoints = require('../constants/endpoints')
const message_controller = require('../controllers/message.controller')
const authenticate = require("../middlewares/authenticate.middleware");
const message_router = express.Router();

message_router.get(endpoints.messages.getAll, message_controller.getAll);
message_router.get(endpoints.messages.getOne, message_controller.getOne);
message_router.delete(endpoints.messages.delete, message_controller.delete);
message_router.patch(endpoints.messages.update, message_controller.update);
message_router.post(endpoints.messages.post, message_controller.post);

module.exports = message_router;