const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

let UserSchema = mongoose.Schema({
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
        required:true
    },
    email: {
       type:String,
       required:true
   },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
   password: {
      type: String,
      required: true
   }
});

UserSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secret')
    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user);
    })
}


UserSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token, 'secret', function (err, decode) {
        user.findOne({ "_id": decode, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

module.exports = mongoose.model('users',UserSchema);