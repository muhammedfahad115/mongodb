const productModel = require('../models/productSchema');
const userModel = require('../models/userSchema')
const detailsSchema = require('../models/detailsSchema')
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
let message = '';

let obj = {
    gethome:async (req, res) => {
        if (req.session.key) {
            const allProducts = await productModel.find()
            res.render('user/home',{allProducts})
        }
        else {
            res.redirect('/login')
        }
    },
    getsignup: (req, res) => {
        if (req.session.key) {
            res.redirect('/home')
        } else {
            res.render('user/signup', { message: message })
            message = ''
        }
    },
    getlogin: (req, res) => {
        if (req.session.key) {
            res.redirect('/home')
        } else {
            res.render('user/login', { message: message })
            message = ''
        }
    }, getadmin: (req, res) => {
        if (req.session.secure) {
            res.render('admin/admin')
        } else {
            res.redirect('/login')
        }
    },
    postsign: async (req, res) => {
        const { FirstName, LastName, Email, password } = req.body
        let existinguser = await userModel.findOne({ email: Email })
        if (existinguser) {
            message = 'you already have an account'
        }
        else {
            const hashedpassword = await bcrypt.hash(password, 10)
            const newUser = new userModel(
                {
                    firstname: FirstName,
                    lastname: LastName,
                    email: Email,
                    password: hashedpassword
                } 
            )
            newUser.save()
            const foridfund = await userModel.findOne({email:Email})
            console.log(foridfund)
            const userId=foridfund._id
            console.log(userId)
            req.session.key = userId
            res.redirect(`/home/${userId}`)
        }
    },
    postlogin: async (req, res) => {
        const { email, password } = req.body;
        // console.log(userModel)
        const isAdmin = await userModel.findOne({ usertype:"admin"})
        // console.log(isAdmin);
        const adminCheck = await bcrypt.compare(password, isAdmin.password)
        const validate = isAdmin.email == email && adminCheck
        if (validate) {
            req.session.secure = true
            res.redirect('/admin')
        } else {

            const emailCheck = await userModel.findOne({ email: email });
            console.log(emailCheck)
            if (emailCheck) {
                const compared = await bcrypt.compare(password, emailCheck.password)
                if (compared) {
                    req.session.key = emailCheck._id
                    const userId = req.session.key
                    console.log(req.session.key)
                    if(emailCheck.usertype === 'admin'){
                        // Admin home
                        res.redirect('/admin')
                    }else{
                        // User home
                        res.redirect(`/home/${userId}`)
                    }
                } else {
                    res.redirect('/login')
                }
            }}
        },
        getupdateproduct:async(req,res)=>{
        if(req.session.key){
            const id = req.session.key
            const userDetails = await userModel.findOne({_id:id})
            res.render('user/updateprofile',{userDetails})
        }else{
            res.redirect('/login')
        }
        },
        postupdateprofile :async (req,res)=>{
            const {firstname,lastname,email,password,phonenumber,dateofbirth,userId} = req.body
            const userprofile = await detailsSchema.findOneAndUpdate({})

        },
        postregister : async (req,res)=>{
            if(req.session.key){
                const user = await userModel.findOne({_id:req.session.key});
                const userId = user._id
                console.log(user+"vhxckj,cdkhdkkdgkgkck");
                const  {phonenumber,dateofbirth} = req.body
                const userDetails = await detailsSchema.updateOne(
                    {userId},{$set:{userId,phonenumber,dateofbirth}},
                    {upsert:true});
                    // res.redirect(`/viewprofile/${userId}`)
                    // res.redirect('/viewprofile')
                    res.render('user/updateprofile',{userDetails})
            }else{
                res.redirect('/updateproduct')
            }
        },
        getupdate: async (req,res)=>{
           if(req.session.key){
            const userId = req.session.key
            console.log(userId);
            const user = await userModel.findOne({_id:req.session.key});
            const lookupUser = await userModel.aggregate([
                {$match: { _id : user._id}},
                {
                    $lookup: {
                      from: "userprofiles",
                      localField: "_id",
                      foreignField: "userId",
                      as: "moreDetails",
                    },
                  },
                ])
                console.log(user)
                res.render('user/viewprofile',{lookupUser})
           }else{
            res.redirect('/login')
           }},
        getlogout: (req, res) => {
            req.session.destroy((err) => {
                if (err) {
                    console.log('session has been destroyed')
                } else {
                    res.redirect('/login')
                }
            })
        },

        
    }


module.exports = obj

