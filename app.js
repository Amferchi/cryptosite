var express = require("express");
var mongoose =require("mongoose");
var app = express()
var passport = require("passport");
var cron = require("node-cron")
var localStrategy = require("passport-local")
var passmonlocal = require("passport-local-mongoose");
var bodyparse = require("body-parser");
var flash = require("connect-flash");
var user = require("./models/user.js");
var authRoutes = require("./routes/auth")
var indexRoutes = require("./routes/index")
var Admin = require("./models/admin")
var investments = require("./models/investment")
var deposits = require("./models/deposits");
var plans = require("./models/plans")
var middleware = require("./middleware")
var AdminRoutes = require("./routes/admin");

mongoose.connect("mongodb://localhost/crypto-site")
app.use(require("express-session")({
 secret:"secret",
 resave: false,
 saveUninitialized: false
}));
app.use(flash())
app.use(bodyparse.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session())
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())

app.use(function(req , res, next){
    res.locals.user = req.user;
    next();
})
app.use(express.static(__dirname + "/public"));
app.use(AdminRoutes)
app.use(authRoutes)
app.use(indexRoutes)
app.set("view engine" , "ejs")


// Define the update logic
/*const updateElements = async () => {
  try {
    // Query for the elements you want to update
    const elementsToUpdate = await deposits.find({});

    // Perform the necessary updates on each element
    elementsToUpdate.forEach(async (element) => {
      element.amount = element.amount +  2/100 * element.amount ;
      await element.save(); // Save the changes to the database
    });

    console.log('Elements updated successfully');
  } catch (error) {
    console.error('Error updating elements:', error);
  }
};

// Schedule the cron job to run every hour (0 * * * *)*/
//cron.schedule('*/1 * * * *', updateElements); //


//Create plan from admin//

// Retrieve and schedule the cron jobs when the server starts
async function scheduleCronJobs() {
  const cronSchedules = await plans.find();
  cronSchedules.forEach((schedule) => {
    function findInvestTask (){investments.find({planName: schedule.planName}, (err,investment)=>{
  if(err){console.log(err)}
    else{
     investment.forEach(function(investPlan){
      console.log(schedule.rate, investPlan.profit,investPlan.amount)
     investPlan.profit = investPlan.profit + schedule.rate/100 * investPlan.amount
     investPlan.save();
     console.log('Elements updated successfully');

   })
  }
})
}
    cron.schedule(schedule.schedule, findInvestTask);
  });
}


app.listen(378, () => {
  console.log("server is live and active");
  scheduleCronJobs().catch((error) => {
    console.error('Error scheduling cron jobs:', error);
  });
});
