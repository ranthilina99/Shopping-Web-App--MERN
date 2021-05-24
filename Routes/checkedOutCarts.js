const express = require('express');
const router = express.Router();
//const router = require('express').Router();
let Product = require('../schemas/item.model');
var Cart = require('../schemas/cart.model');
const User = require('../schemas/Customer');
const auth = require('../Middleware/CartAuthentication');
const async = require('async');


router.route('/').get((req, res) => {
    Cart.find()
        .then(carts => res.json(carts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Cart.findByIdAndDelete(req.params.id)
        .then(() => res.json('Cart Deleted!'))
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;