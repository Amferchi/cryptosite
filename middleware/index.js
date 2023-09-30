var admin = require("../models/admin.js")

var middlewareObj = {};

middlewareObj.isLoggedin = function(req , res , next){
  if(req.isAuthenticated()){
   return next();
  }
  res.redirect("/login")
}

middlewareObj.admin = function(req, res , next){
  if(req.isAuthenticated()){
    var adminEmail = req.user.email

return admin.findOne({ email: adminEmail}, function( err, admin){

    if(!admin){
      console.log(admin + "notfound")
      res.send("cannot get /admin/234crvS554")
    }
  else{
    console.log(admin + "found")
      next()
  }
})
}
res.send("cannot get /admin/234crvS554")
}

module.exports = middlewareObj;