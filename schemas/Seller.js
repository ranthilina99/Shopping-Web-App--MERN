const mongoose = require('mongoose');

let CreditSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    email: {
       type:String,
       required:true
   },
   password: {
      type: String,
      required: true
   }
});


module.exports = mongoose.model('store_managers',CreditSchema);