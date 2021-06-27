require('dotenv').config()
const path = require('path')
const express = require('express')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)
const passport = require('passport')

// Initialize Express app
const app = express()
// Set  PORT 
const PORT = process.env.PORT || 3000; // process.env is made available by dotenv. Stores env constants in .env file 

// Database connection
const url = 'mongodb://localhost/grozzys';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});


// Session store 
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

// Session config
app.use(session({
secret: process.env.COOKIE_SECRET,
resave: false, 
store: mongoStore,
saveUninitialized: false, 
cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour 
}))

// Passport config 
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
// Assets 
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Global middleware 
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

// Make public folder accessible to client-side
app.use(express.static('public'))

//===== Set Template Engine ==========
app.use(expressLayout)
app.set('views',path.join(__dirname, 'resources/views')) // sets views
app.set('view engine', 'ejs')  // Tell app to use ejs template engine


// Routes and pass app instance
require('./routes/web')(app)



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})