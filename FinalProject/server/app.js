const app = require('./config/main')
const bodyParser = require("body-parser");
const cors = require("cors");

const route =require('./routes/index')
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: ['https://admin-code-final.vercel.app','https://client-code-final.vercel.app'], // İcazə verilən frontend domeni
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, // Əgər cookie və ya digər header-lər göndərilirsə
};
app.use(cors(corsOptions));

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