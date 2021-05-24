const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { check, validationResult} = require('express-validator');
const UserSchema = require('../schemas/Customer');
const config = require('config');
const auth = require('../Middleware/Authentication');

router.get (
    '/',
    auth,
    async (req,res) => {
        try{
            const user =  await UserSchema.findById(req.user.id).select('-password');
            await res.json(user);
        }catch (e) {
            console.log(e.message);
            return res.status(500).json({msg:"server Error..."});
        }
    }

)
// router.route('/').get((req, res) => {
//     UserSchema.find()
//         .then(users => res.json(users))
//         .catch(err => res.status(400).json('Error: ' + err));
// });


router.post(
    '/register',
    [
        check('firstName','First Name is required').not().isEmpty(),
        check('lastName','Last Name is required').not().isEmpty(),
        check('email','Type proper Email').isEmail(),
        check('password','Password is required').not().isEmpty()
    ],
    async (req,res) =>{
        try{
            let { firstName, lastName, email, password } = req.body;
            const position = "user";
            let user = await UserSchema.findOne({ email });
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(401).json({errors: errors.array()});
            }

            if(user){
                return res.status(401).json({alert: "There is a already user who uses this email"})//msg tibbe alert kala
            }

            const salt = await bcryptjs.genSalt(10);
            password = await bcryptjs.hash(password,salt);

            user = new UserSchema({
                firstName,
                lastName,
                position,
                email,
                password
            });

            await  user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                (err,token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            )

        }catch (e) {
            console.log(e.message);
            return res.status(500).json({msg:"server Error..."});
        }
    }
);


router.post(
    '/login',
    [
        check('email', 'Type Proper Email').isEmail(),
        check('password','Password is required').not().isEmpty()
    ],
    async (req,res) => {
        try{

            const {email,password} = req.body;

            const errors = validationResult(req);
            let user = await UserSchema.findOne({email});


            if(!errors.isEmpty()){
                return res.status(401).json({ errors: errors.array()});
            }
            if(!user){
                return res.status(401).json({alert: "There is no user with this email"});
            }

            let isPasswordMatch = await bcryptjs.compare(password,user.password);

            if(isPasswordMatch){

                const payload = {
                    user: {
                        id: user.id
                    }
                };

                jwt.sign(
                    payload,
                    config.get('jwtSecret'),
                    (err,token) => {
                        if(err) throw err;
                        res.json({ token });
                    }
                )

            } else return res.status(401).json({msg:"Password is not Matching "})

        }catch (e) {
            console.log(e.message);
            return res.status(500).json({alert:"server Error..."});
        }
    }
);
module.exports = router;