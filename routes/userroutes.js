const express  = require('express')
const router  = express.Router()
const validation = require('../validation/validation')
const { getsignup, getlogin, gethome, postlogin, postsign, getlogout, getadmin }= require('../controllers/mainControllers')


router.get('/signup',getsignup)
router.post('/signup',validation,postsign)
router.get('/login',getlogin)
router.post('/login',postlogin)
router.get('/home',gethome)
router.get('/logout',getlogout)
router.get('/admin',getadmin)
module.exports = router