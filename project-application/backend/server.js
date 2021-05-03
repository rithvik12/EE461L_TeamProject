const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/users");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/users", users);

const port = process.env.PORT || 5000;

// add the API endpoint routes so the server can be used to perform CRUD operation
// load routers from routes files
const projectsRouter = require('./routes/projects');
//const usersRouter = require('./routes/users');
const hardwaresRouter = require('./routes/hardwares');

//routers added as middleware
app.use('/projects', projectsRouter);
//app.use('/users', usersRouter);
app.use('/hardwares', hardwaresRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});