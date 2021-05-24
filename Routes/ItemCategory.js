const router = require('express').Router();
let ItemCategory = require('../schemas/category.model');

router.route('/').get((req, res) => {
    ItemCategory.find()
        .then(category => res.json(category))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) =>{
    const cname = req.body.cname;
    const cdescription = req.body.cdescription;

    const newCategory = new ItemCategory({
        cname,
        cdescription,
    });

    newCategory.save()
        .then(() => res.json('ItemCategory added!'))
        .catch(err => res.status(400).json('Error is: ' + err));
});

router.route('/:id').get((req,res) =>{
    ItemCategory.findById(req.params.id)
        .then(category => req.json(category))
        .catch(err => res.status(400).json('Error'+err));
})

router.route('/:id').delete((req,res) =>{
    ItemCategory.findByIdAndDelete(req.params.id)
        .then(() => res.json('ItemCategory Deleted!'))
        .catch(err => res.status(400).json('Error'+err));
});

router.route('/update/:id').post((req, res) =>{
    ItemCategory.findById(req.params.id)
        .then(category =>{
            category.cname = req.body.cname;
            category.cdescription = req.body.cdescription;

            category.save()
                .then(() => res.json('ItemCategory Updated!'))
                .catch(err => res.status(400).json('Error is: ' + err));
        })
        .catch(err => res.status(400).json('Error is:' + err));
});

module.exports = router;