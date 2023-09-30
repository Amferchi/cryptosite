var express = require("express")
var router = express.Router()
var investments = require("../models/investment")
var deposits = require("../models/deposits")
var middleware = require("../middleware")
var users = require("../models/user")
var cron = require("node-cron")
var plans = require("../models/plans")

router.get("/admin", (req,res) =>{
     res.render("admin")
})

router.get("/admin/users" ,function(req,res){
     users.find({}).sort({"_id":-1}).exec(function(err,users){
        if(err){console.log(err)}
        else{
        res.render("user-view", {users:users})
        }
     })
})

router.get("/admin/deposits", function(req,res){
    deposits.find({status:"pending"}).sort({"_id":-1}).exec((err,deposits) =>{
        if(err){console.log(err)}
        else{
          res.render("depo-view", {deposits:deposits})       
        }
    })
})

router.post("/admin/:id/confirm-deposit", function(req,res){
    deposits.findByIdAndUpdate(req.params.id,{status:"confirmed"}, function(err,deposit){
        if(err){console.log(err)}
        else{
    users.findById(deposit.userId, function(err, user){
         user.balance = user.balance + deposit.amount;
         user.save();
     })
        res.redirect("/admin/deposits")}
    })
})

// Admin panel route to display the form
router.get('/admin/New-plan', (req, res) => {
    res.render("new-plan")

});

// Admin panel route to handle the form submission and create cron schedules
router.post('/admin/New-plan', async (req, res) => {
  const schedule = req.body.schedule;
  const rate = req.body.task; 
  
  // Create a new cron schedule and save it in the database
  const cronSchedule = new plans({
    schedule:schedule,
    rate:rate,
    planName:req.body.planName
  });

  await cronSchedule.save();

 function findInvestTask (){
     investments.find({planName: req.body.planName}, (err,investment)=>{
         if(err){console.log(err)}
         else{
       investment.forEach(function(investPlan){
       investPlan.profit = investPlan.profit + rate/100 * investPlan.amount
       investPlan.save();
     })
    }
  })
  }

  // Schedule the cron job using node-cron
  cron.schedule(schedule, findInvestTask);

  res.redirect('/admin');
});

module.exports = router;