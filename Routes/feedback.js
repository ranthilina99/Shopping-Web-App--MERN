const router = require('express').Router();
let Feedback = require('../schemas/feedback.model');

router.route('/').get((req, res) => {
    Feedback.find()
        .then(feedback => res.json(feedback))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const rating = req.body.rating;
    const comment = req.body.comment;
    const reply = req.body.reply;

    const newFeedback = new Feedback({
        name,
        email,
        rating,
        comment,
        reply
    });

    newFeedback.save()
        .then(() => res.json('Feedback Posted!'))
        .catch(err => res.status(400).json('Error is: ' + err));
});

router.route('/user/:email').get((req, res) => {

    const email = req.params.email;

    Feedback.find({email: email})
        .then(feedback => res.json(feedback))
        .catch(err => res.status(400).json('Error is: ' + err));

});

router.route('/delete/:feedbackId').delete((req, res) => {

    const feedbackId = req.params.feedbackId;

    Feedback.deleteOne({_id: feedbackId})
        .then(() => res.json('Feedback Deleted!'))
        .catch(err => res.status(400).json('Error is: ' + err));

});

router.route('/search/:start/:end').get((req, res) => {

    const startDate = req.params.start;
    const endDate = req.params.end;

    Feedback.find({"$and": [{createdAt: {"$gte": startDate}}, {createdAt: {"$lte": endDate}}]})
        .then(feedback => res.json(feedback))
        .catch(err => res.status(400).json('Error is: ' + err));


});

router.route('/:feedbackID').put((req, res) => {

    const ID = req.params.feedbackID;

    const feedback = {
        name: req.body.name,
        email: req.body.email,
        rating: req.body.rating,
        comment: req.body.comment,
        reply: req.body.reply,
    }


    Feedback.updateOne({_id: ID}, feedback)
        .then(() => res.json('Replied to the Feedback!'))
        .catch(err => res.status(400).json('Error is: ' + err));

})

module.exports = router;