var mongoose = require("mongoose");
var passmonlocal = require("passport-local-mongoose"); 

var UserSchema = new mongoose.Schema({
    fullname:String,
    email: String,
    country:String,
    gender:String,
    phone:Number,
    verified: {
        type: Boolean,
        default: false
    },
    username:String,
    password:String,
    balance:{type:Number , default:0}
})

UserSchema.plugin(passmonlocal);
module.exports = mongoose.model("User" , UserSchema)