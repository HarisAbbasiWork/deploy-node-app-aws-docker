
const express = require('express')
var request =require('request')
const app = express()
require('dotenv').config()

const db = require('./config/dbconfig.js')

var bodyParser = require('body-parser')
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
const passport =require('passport')

const port = 5000
var cors = require('cors')
app.use(cors())
const session = require('express-session');

app.use(session({
  secret: 'somevalue',
  saveUninitialized: false,
  resave: false,
  
}));
 app.use(passport.initialize())
app.use(passport.session())
 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/userroutes.js","./routes/teacherroutes.js","./routes/taskroutes.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);


var instructorroutes1 = require('./routes/instructorroutes');
var teacherroutes1 = require('./routes/teacherroutes');
var taskroutes1 = require('./routes/taskroutes');
var userroutes1 = require('./routes/userroutes');
app.use(instructorroutes1);
app.use(teacherroutes1);
app.use(taskroutes1);
app.use(userroutes1);
app.get('/', (req, res) => {
  res.send("Hello World")
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})