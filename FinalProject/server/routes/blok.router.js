const express=require('express')
const endpoints=require('../constants/endpoints')
const blok_controller=require('../controllers/blok.controller')
const blok_post_middleware=require('../middlewares/blok.middleware')
const authenticate = require("../middlewares/authenticate.middleware");
const blok_router = express.Router();

blok_router.get(endpoints.bloks.getAll,authenticate,blok_controller.getAll);
blok_router.get(endpoints.bloks.getOne,authenticate,blok_controller.getOne);
blok_router.delete(endpoints.bloks.delete,blok_controller.delete);
blok_router.patch(endpoints.bloks.update,blok_controller.update);
blok_router.post(endpoints.bloks.post,blok_post_middleware,blok_controller.post);

module.exports=blok_router;