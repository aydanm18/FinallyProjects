const express=require('express')
const endpoints=require('../constants/endpoints')
const menu_controller=require('../controllers/menu.controller')
const menu_post_middleware=require('../middlewares/menu.middleware')
const authenticate = require("../middlewares/authenticate.middleware");
const menu_router = express.Router();

menu_router.get(endpoints.menues.getAll,authenticate,menu_controller.getAll);
menu_router.get(endpoints.menues.getOne,authenticate,menu_controller.getOne);
menu_router.delete(endpoints.menues.delete,menu_controller.delete);
menu_router.patch(endpoints.menues.update,menu_controller.update);
menu_router.post(endpoints.menues.post,menu_post_middleware,menu_controller.post);

module.exports=menu_router;