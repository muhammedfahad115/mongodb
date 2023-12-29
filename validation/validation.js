
function validation(req, res, next) {
   const password = req.body.password
   const confirm = req.body.Reenterpassword
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
   const match = passwordRegex.test(password)
   if (match && confirm==password) {
      next()
   } else {
      res.redirect('/signup')
   }
}

module.exports = validation