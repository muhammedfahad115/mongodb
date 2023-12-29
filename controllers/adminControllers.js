
const productModel = require("../models/productSchema")
const obj2 = {
    getproduct: (req, res) => {
        if(req.session.secure){

            res.render('admin/product')
        }else{
            res.redirect('/login')
        }
    },
    postproduct :async (req,res)=>{
        const {productName,description,price} = req.body
        const products = new productModel ({
            productName:productName,
            description:description,
            price:price
        })
        await products.save().then(()=>{
            console.log('product has been saved');
            res.redirect('/product')
        })
    },
    getshowproduct :async (req,res)=>{
       if(req.session.secure){

        const allProducts = await productModel.find({})

        
        res.render('admin/showproduct',{allProducts})
       }else{
        res.redirect('/login')
       }
    },
    postdeleteProduct : async (req,res)=>{
        const productId = req.params.productId
        await productModel.findOneAndDelete({_id:productId})
        res.redirect('/showproduct')
    }
}
module.exports = obj2