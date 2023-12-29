const express  = require('express')
const router  = express.Router()
const {getproduct, postproduct, getshowproduct,postdeleteProduct}=require('../controllers/adminControllers')
router.get('/product',getproduct)
router.post('/product',postproduct)
router.get('/showproduct',getshowproduct)
router.post('/deleteProduct/:productId',postdeleteProduct)
module.exports = router