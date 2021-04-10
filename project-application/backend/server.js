
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// load routers from other files
const projectsRouter = require('./routes/projects');
const usersRouter = require('./routes/users');
const hardwaresRouter = require('./routes/hardwares');

app.use('/projects', projectsRouter);
app.use('/users', usersRouter);
app.use('/hardwares', hardwaresRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});