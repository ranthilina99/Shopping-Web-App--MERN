const mongoose = require('mongoose');
const config = require('config');

const datebaseConnection = async () => {
    try {
        await mongoose.connect(
            config.get('mongoURI'),
        {
                    useCreateIndex: true,
                    useFindAndModify: true,
                    useUnifiedTopology:true,
                    useNewUrlParser:true
                }
        )
        console.log('Connected to Database')
    }catch(error){
        console.log(error);
        process.exit(1);
    }
};

module.exports = datebaseConnection();