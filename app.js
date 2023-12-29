const express = require('express')
const app = express()
const path = require("path")
const port = 2000
const bodyParser = require('body-parser')
const adminRouter = require("./routes/adminroutes")
const userouter = require('./routes/userroutes')
const session  = require('express-session')
const nocache = require('nocache')
require('./configure/configure')()
app.set('view engine','ejs')
app.use(nocache())
app.use(session({
    secret:"fahad",
    resave:"false",
    saveUninitialized:"true"
}))

app.use(express.static(path.join(__dirname,"public")))
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/',userouter)
app.use("/",adminRouter)


app.listen(port,()=>{
    console.log('server is running')
})