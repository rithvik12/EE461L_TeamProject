//Express is a web application framework for Node.js
const express = require('express');
//CORS (cross-origin resource sharing) allows acessing resources from remote hosts (Express middleware)
const cors = require('cors');
//Mongoose used for database scheme, makes interacting w/ MongoDB through Node.js simpler
const mongoose = require('mongoose');

//dotenv loads environment vars from .env file into process.env
//store environment vars in file instead of dev machine
require('dotenv').config();

//create express server
const app = express();
//make server listen on port 5000
const port = process.env.PORT || 5000;

//add cors and express.json middleware to send/recieve json
app.use(cors());
app.use(express.json());

//Connect to MongoDB atlas database
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// add the API endpoint routes so the server can be used to perform CRUD operation
// load routers from routes files
const projectsRouter = require('./routes/projects');
const usersRouter = require('./routes/users');
const hardwaresRouter = require('./routes/hardwares');

//routers added as middleware
app.use('/projects', projectsRouter);
app.use('/users', usersRouter);
app.use('/hardwares', hardwaresRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});