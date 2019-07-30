require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const {PORT, SESSION_SECRET} = process.env
const checkSession = require('./middlewares/checkForSession')
const swagCtrl = require('./controllers/swagController')
const authCtrl = require('./controllers/authController')

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
app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)

//LISTENER
app.listen(PORT, () => console.log(`Captain's Log #${PORT}: We are lost in space...`))