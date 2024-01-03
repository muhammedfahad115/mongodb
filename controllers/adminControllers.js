
const productModel = require("../models/productSchema")
const userModel = require("../models/userSchema")
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
    },
    getshowuserlist :async (req,res)=>{
        if(req.session.secure){
            const allUser = await userModel.find({})
            res.render('admin/showuser',({allUser:allUser}))
        }else{
            res.redirect('/login')
        }
    },
    postdeleteusUser : async (req,res)=>{
        const userId = req.params.userId
       await userModel.findOneAndDelete({_id:userId})
        res.redirect('/showuser')
    },
    getedit : async (req,res)=>{
        const productId = req.params.productId
        let  product = await productModel.findById({_id:productId})
        res.render('admin/productupdate',{product})
    },
    postedit :async (req,res)=>{
        console.log(req.body)
        const {productName,description,price} = req.body
        // console.log(productName)
        const productId = req.params.productId
        let product = await productModel.findById({_id:productId})
        // console.log(product)
        // console.log(product.productName)
        product.productName=productName
        product.description=description
        product.price=price
        await product.save().then(()=>{ 
            console.log('products has updated successfully  ')

            res.redirect('/showproduct')
        })
    }
}
module.exports = obj2


