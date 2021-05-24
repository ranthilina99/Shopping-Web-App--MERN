const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function (req,res,next) {
    try{
        const token = req.header('x-auth-token');
        const verifiedUser = jwt.verify(
            token,
            config.get('jwtSecret')
        )
        //newly added
        const verifiedSM = jwt.verify(
            token,
            config.get('jwtSecret')
        )

        req.user = verifiedUser.user;
        req.store_manager = verifiedSM.store_manager;//this line newly added
        next();
    }catch (e) {
        console.log(e.message)
        return res.status(500).json({msg: "Server Error..."})
    }
}