require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const {PORT, SESSION_SECRET} = process.env
const checkSession = require('./middlewares/checkForSession')
const swagCtrl = require('./controllers/swagController')

//TOP LEVEL MIDDLEWARE
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkSession)

//ENPOINTS
app.get('/api/swag', swagCtrl.read)

//LISTENER
app.listen(PORT, () => console.log(`Captain's Log #${PORT}: We are lost in space...`))