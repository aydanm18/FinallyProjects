const app = require('./config/main')
const bodyParser = require("body-parser");
const cors = require("cors");

const route =require('./routes/index')
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
    "https://client-code-final.vercel.app/",   // Client frontend URL
    "https://admin-code-final.vercel.app/"     // Admin frontend URL
  ];
  
  app.use(cors({
    origin: allowedOrigins,  // Allow both client and admin frontends
    methods: ["GET", "POST", "PUT", "DELETE"]
  }));

app.use(route.bloks)
app.use(route.reservations)
app.use(route.users)
app.use(route.orders)
app.use(route.teams)
app.use(route.menues)
app.use(route.messages)

app.get("/", (req, res) => {
    res.send("Welcome to the deployed project!");
  });

module.exports = app