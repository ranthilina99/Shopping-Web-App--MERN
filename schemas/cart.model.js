const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    CUser: {type: String,required: true},
    CProduct:{type: Array, required: true},
    CQuantity:{type:Number, required:true},
    CAmount:{type:Number, required:true}
},{
    timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;