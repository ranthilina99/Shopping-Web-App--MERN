const mongoose = require('mongoose');

let SMSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    cardNo: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    ccv: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('credit_cards',SMSchema);