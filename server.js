const express = require('express');
const app = express();
const cors = require('cors');
require('./Config/DatebaseConnection');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

app.use(cors());
app.use(cookieParser())

app.use(bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit:50000
}));

app.use('/api/users', require('./Routes/Customers'));
app.use('/api/store_manager', require('./Routes/Seller'));
app.use('/api/creditCard', require('./Routes/creditcard'));

const categoryRouter = require('./Routes/ItemCategory');
const productRouter = require('./Routes/Item');
const cartRouter = require('./Routes/Cart');
const feedbackRouter = require('./Routes/feedback');
const checkedOurCartRouter = require('./Routes/checkedOutCarts');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose')

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie:{maxAge:180*60*100}
}));

app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/checkedOutCarts', checkedOurCartRouter);
app.use('/api/feedback', feedbackRouter);

app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

///////////////////////////////////////////////////////////////
// Load Dependencies
var exphbs  = require('express-handlebars');

// Load configuration from .env file
require('dotenv').config();

// Load and initialize MesageBird SDK
var messagebird = require('messagebird')(process.env.MESSAGEBIRD_API_KEY);

// Set up and configure the Express framework
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('views engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended : true }));

// Display page to ask the user for their phone number

// Display page to ask the user for their phone number
app.get('/step1', function(req, res) {
    return res.json({
        data : res.data
    });
});

app.post('/step1', function(req, res) {
    let number = req.body.number;

    // Make request to Verify API
    messagebird.verify.create(number, {
        originator : 'Code',
        template : 'Your verification code is %token.'
    }, function (err, response) {
        if (err) {
            // Request has failed
            console.log(err);
            res.json({
                error : err.errors[0].description
            });
        } else {
            // Request was successful
            console.log(response);
            res.json({
                id : response.id
            });
        }
    })
});

app.post("/step2", (req, res) => {

    let tokenID = req.body.tokenID;
    let token = req.body.token;

    messagebird.verify.verify(tokenID, token,
        function(err, response) {
            if (err) {
                // Verification has failed
                console.log(err);
                res.json({
                    token : token,
                    tokenID : tokenID,
                    error: err.errors[0].description,

                });
            } else {
                // Verification was successful
                console.log(response);
            }
        })

});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => console.log('Server is running on PORT', PORT));