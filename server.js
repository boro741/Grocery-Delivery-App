const path = require('path')
const express = require('express')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')

// Initialize Express app
const app = express()
// Set  PORT 
const PORT = process.env.PORT || 3000; // process.env is made available by dotenv. Stores env constants in .env file 



// Make public folder accessible to client-side
app.use(express.static('public'))

//===== Set Template Engine ==========
app.use(expressLayout)
app.set('views',path.join(__dirname, 'resources/views')) // sets views
app.set('view engine', 'ejs')  // Tell app to use ejs template engine

// Routes
app.get('/', (req,res) => {
    res.render('home')
})



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})