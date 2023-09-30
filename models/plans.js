var mongoose = require("mongoose")

const planSchema = new mongoose.Schema({
    schedule: String,
    planName:String,
    rate: Number,
    expire:Number,
  });
  
  const plans = mongoose.model('plan', planSchema);

  module.exports = plans;