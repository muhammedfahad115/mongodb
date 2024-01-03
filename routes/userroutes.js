const express  = require('express')
const router  = express.Router()
const validation = require('../validation/validation')
const { getsignup, getlogin, gethome, postlogin, postsign, getlogout, getadmin,getupdateproduct, postupdateprofile,postregister,getupdate}= require('../controllers/mainControllers')


router.get('/signup',getsignup)
router.post('/signup',validation,postsign)
router.get('/login',getlogin)
router.post('/login',postlogin)
router.get('/home/:userId',gethome)
router.get('/logout',getlogout)
router.get('/admin',getadmin)
router.get('/updateproduct',getupdateproduct)
router.post('/updateproduct',postupdateprofile)
router.post('/updation',postregister)
router.get('/update',getupdate)
module.exports = router