require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const {PORT, SESSION_SECRET} = process.env

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.listen(PORT, () => console.log(`Captain's Log #${PORT}: We are lost in space...`))