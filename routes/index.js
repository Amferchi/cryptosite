var express = require("express")
var router = express.Router()
var investments = require("../models/investment")
var deposits = require("../models/deposits")
var middleware = require("../middleware")

var pt1 = Math.floor(Math.random() * 600)
var pt2 = Math.floor(Math.random() * 600)
var pt3 = Math.floor(Math.random() * 245)

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const alpha1index = Math.floor(Math.random() * alphabet.length);
const alpha1 = alphabet[alpha1index];
const alpha2index = Math.floor(Math.random() * alphabet.length);
const alpha2 = alphabet[alpha2index];
const alpha3index = Math.floor(Math.random() * alphabet.length);
const alpha3 = alphabet[alpha3index];

const transID = "TRID" + pt1 + pt2 + pt3 + alpha1 + alpha2 + alpha3


router.get("/", (req,res) => {
     res.render("landing")
})

router.get("/dashboard", (req,res) =>{
  investments.find({userId:req.user._id},function(err,invested){
     if(err){console.log(req.user)}
     else{
    const sum = invested.reduce((acc, obj) => {
        return acc + obj.profit;
      }, 0);
 deposits.find({userId:req.user._id, status:"confirmed"}, (err, deposits)=>{
     if(err){console.log(err)}
     else{res.render("dashboard" , {invested:invested, deposited:deposits , profit:sum})}
      })
     }
  })
})

router.post("/deposit", function(req,res){
   deposits.create({
      fullname:req.body.fullname,
      email:req.body.email,
      amount:req.body.amount,
      transId: transID,
      userId:req.user._id
    }, function(err,deposit){
      if(err){console.log(err)}
       else{
     res.redirect("/deposits/history")}
     })
 }
 )

router.post("/new/invest", function(req,res){
     investments.create({
        planName:req.body.plan,
        amount:req.body.amount,
        userId:req.user._id
      }, function(err){
        if(err){console.log(err)}
         else{
       res.redirect("/dashboard")}
       })
   }
   )

router.get("/investments", function(req,res){
     investments.find({userId:req.user._id}).sort({"_id":-1}).exec(function(err,investment){
         if(err){console.log(err)}
          else{
            res.render("investment", {investments:investment})
          }
        })
   })

router.get("/invest", function(req,res){

      res.render("invest")
   })

router.get("/deposits/history", function(req,res){
  deposits.find({userId:req.user._id}).sort({"_id":-1}).exec(function(err,value){
      if(err){console.log(err)}
       else{
         res.render("deposit-history", {deposits:value})
       }
     })
})

router.get("/deposit", function(req,res){
     console.log(req.user)
     res.render("deposit")
})




module.exports = router;