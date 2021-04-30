if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

//store users locally
//need to change to a database, connect to mongoDB database
//doing authentication and login part
const users =[]

app.set('view-engine', 'ejs')

app.use(express.json());
//tells app to take forms and access them inside request variable in post methods
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//call checkAuthenticated to check that user has access to that page first
app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})


//don't want user to access login page if already logged in
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    //can store this hashed password in database
    //below info is automatically generated w/ a database
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

//middleware
//protect certain routes
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

const mongoose = require('mongoose');
const cors = require('cors')
app.use(cors());
const port = process.env.PORT || 5000;

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