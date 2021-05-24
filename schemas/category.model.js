const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    cname: {
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    cdescription:{type: String, required: true},
},{
    timestamps: true,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;