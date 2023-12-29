const userModel = require('../models/userSchema')
const bcrypt = require('bcrypt')
let message = '';

let obj = {
    gethome: (req, res) => {
        if (req.session.key) {
            res.render('user/home')
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
            req.session.key = true
            res.redirect('/home')
        }
    },
    postlogin: async (req, res) => {
        const { email, password } = req.body;
        console.log(userModel)
        const isAdmin = await userModel.findOne({ usertype:"admin"})
        console.log(isAdmin);
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
                    req.session.key = true
                    res.redirect('/home')
                } else {
                    res.redirect('/login')
                }
            }}
        },
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

