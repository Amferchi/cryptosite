var mongoose = require("mongoose");

var depositSchema =  new mongoose.Schema({
    amount:{type:Number, default:0},
    fullname:String,
    email:String,
    userId:{type:String, required:true},
    transId:{type:String, required:true},
    status:{type:String, default:"pending"},
    date:{type:Date, default:Date.now}

})

module.exports = mongoose.model("deposits" , depositSchema)