const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    PName:{type: String, required: true, trim: true},
    PDescription:{type: String, required: true},
    PCategory:{type: String, required: true},
    PBrand:{type: String, required: true},
    PAmount:{type: Number, required: true},
    PPrice:{type: Number, required: true},
    PDiscount:{type: Number},
    PImage:{type: String}
},{
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;