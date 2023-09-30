var express = require("express")
var router = express.Router()
var User = require("../models/user")
var passport = require("passport");
var localStrategy = require("passport-local")

router.get("/register", function(req, res){
    res.render("register");
  })

router.post("/register", function(req,res){
      User.register(new User({username:req.body.username, fullname:req.body.fullname,
        email:req.body.email,
        country:req.body.country,
        gender:req.body.gender,
        phone:req.body.phone,}),
   req.body.password, function(err, user){
        if(err){
      console.log(err)  
   return res.render("register")
        }
     passport.authenticate("local")(req , res , function(){
           res.redirect("/dashboard")
        })
      })
  })

router.get("/login" , function(req,res){
    res.render("login")
  })

router.get("/logout", function(req, res){
        req.logout(function(err){
          if(err){return(err)}
          res.redirect("/")
        })
  })
router.post("/login", passport.authenticate("local" , {
        successRedirect: "/dashboard",
        failureRedirect: "/login"
  }), function(req,res){
  })


module.exports = router;