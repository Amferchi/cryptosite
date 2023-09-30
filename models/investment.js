var mongoose = require("mongoose");

var investSchema =  new mongoose.Schema({
    amount:{type:Number, default:0},
    userId:{type:String, required:true},
    profit:{type:Number, default:0},
    totalPofit:{type:Number, default:0},
    planName:String,
    date:{type:Date, default:Date.now}
})

module.exports = mongoose.model("investments", investSchema);