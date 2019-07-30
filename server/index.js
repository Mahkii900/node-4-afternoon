require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const {PORT, SESSION_SECRET} = process.env
const checkSession = require('./middlewares/checkForSession')
const swagCtrl = require('./controllers/swagController')
const authCtrl = require('./controllers/authController')
const cartCtrl = require('./controllers/cartController')
const searchCtrl = require('./controllers/searchController')

//----------TOP LEVEL MIDDLEWARE------------
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkSession)
app.use(express.static(`${__dirname}/../build`))

//-----------ENDPOINTS--------------
//AUTH
app.get('/api/swag', swagCtrl.read)
app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)
//CART
app.post('/api/cart/checkout', cartCtrl.checkout)
app.post('/api/cart/:id', cartCtrl.add)
app.delete('/api/cart/:id', cartCtrl.delete)
//SEARCH
app.get('/api/search', searchCtrl.search)

//---------LISTENER-----------
app.listen(PORT, () => console.log(`Captain's Log #${PORT}: We are lost in space...`))