const express = require('express');
const auth = require('../Middleware/Authentication');
const jwt = require('jsonwebtoken');
const CreditSchema = require('../schemas/creditcard');
const router = express.Router();
const { check, validationResult} = require('express-validator');
const config = require('config');
const bcryptjs = require('bcryptjs');
var nodemailer = require('nodemailer');

router.get (
    '/',
    auth,
    async (req,res) => {
        try{
           const credit_card =  await CreditSchema.findById(req.credit_card.id).select('-email');
            await res.json(credit_card);
        }catch (e) {
            console.log(e.message);
            return res.status(500).json({msg:"server Error..."});
        }
    }
)
router.post(
    '/credit_enter',
    [
        check('email', 'Type proper Email').isEmail(),
        check('cardNo', 'cardNo is required').not().isEmpty(),
        check('date', 'date is required').not().isEmpty(),
        check('ccv', 'ccv  is required').not().isEmpty()
    ],
    async (req,res) => {
        try {
            let {email, cardNo, date, ccv} = req.body;
            let credit_card = await CreditSchema.findOne({email});

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(401).json({errors: errors.array()});
            }

            // if (credit_card) {
            //     return res.status(401).json({alert: "There is a already user who uses this email"})//msg tibbe alert kala
            // }


            credit_card = new CreditSchema({
                email,
                cardNo,
                date,
                ccv,
            });



            const payload = {
                credit_card: {
                    id: credit_card.id
                }
            }
            await  credit_card.save();

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                (err,token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            )

            var transporter = nodemailer.createTransport({

                service: 'Gmail',
                auth: {
                    user: 'hugoproducts119@gmail.com',
                    pass: '123hugo@12'
                }
            });

            var mailOptions = {

                from: 'hugoproducts119@gmail.com',
                to: email,
                subject: 'Hugo Products Company',
                text: 'The Amount = 120000 Payment Successful '
            };



            await transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });


        }catch (e) {
            console.log(e.message);
            return res.status(500).json({msg:"server Error..."});
        }
    }
);


module.exports = router;