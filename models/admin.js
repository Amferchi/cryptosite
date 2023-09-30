var mongoose = require("mongoose");

var adminSchema = new mongoose.Schema({
     username:String,
     email:String,
     tag:{type:String,default:"under"}
})

module.exports = mongoose.model("admin",adminSchema)