const express = require('express')
const endpoints = require('../constants/endpoints')
const user_controller = require('../controllers/user.controller')
const upload = require('../middlewares/user.fileupload');
const authenticate = require("../middlewares/authenticate.middleware");
const user_router = express.Router();

user_router.get(endpoints.users.getAll, user_controller.getAll);
user_router.get(endpoints.users.getOne, user_controller.getOne);
user_router.delete(endpoints.users.delete, user_controller.delete);
user_router.patch(endpoints.users.update, user_controller.update);
user_router.post(endpoints.users.post,upload.single('src'), user_controller.register);
user_router.post(endpoints.users.login, user_controller.user_login);
user_router.post(endpoints.users.login, user_controller.admin_login);
user_router.get(endpoints.users.verify, user_controller.verify);

module.exports = user_router;