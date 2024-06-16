const express=require('express')
const endpoints=require('../constants/endpoints')
const team_controller=require('../controllers/team.controller')
const team_post_middleware=require('../middlewares/team.middleware')

const team_router = express.Router();

team_router.get(endpoints.teams.getAll,team_controller.getAll);
team_router.get(endpoints.teams.getOne,team_controller.getOne);
team_router.delete(endpoints.teams.delete,team_controller.delete);
team_router.patch(endpoints.teams.update, team_controller.update);
team_router.post(endpoints.teams.post,team_post_middleware,team_controller.post);

module.exports=team_router;