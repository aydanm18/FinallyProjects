const blok_router=require('./blok.router');
const order_router=require('./order.router');
const user_router=require('./user.router');
const reservation_router=require('./reservation.router');
const team_router = require('./team.router');

const menu_router=require('./menu.router')

const router={
    bloks:blok_router,
    users:user_router,
    reservations:reservation_router,
    orders:order_router,
    teams:team_router,
  
    menues:menu_router
}

module.exports=router;