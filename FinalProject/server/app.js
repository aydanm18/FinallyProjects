const app = require('./config/main')
const bodyParser = require("body-parser");
const cors = require("cors");

const route =require('./routes/index')
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(route.bloks)
app.use(route.reservations)
app.use(route.users)
app.use(route.orders)
app.use(route.teams)
app.use(route.pizzas)
app.use(route.menues)


 
