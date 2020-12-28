const express = require("express");
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");

const bodyParser = require("body-parser");
//create app
const app = express();



//middleware body parser 
app.use(bodyParser.json());

// routes by using routes and controllers
// as middleware
app.use("/posts", postsRoute);
app.use("/users", usersRoute);


module.exports = app;

