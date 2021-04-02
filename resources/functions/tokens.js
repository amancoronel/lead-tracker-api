const jwt = require('jsonwebtoken');
const config = require('../../config');

exports.getAuthId = async (info) => {
    let token = jwt.sign({user : info}, config.TOKEN_SECRET, {expiresIn : "1hr"});
    return token;
}

exports.verifyToken = async (req, res, next) => {
    try {
        let bearer = req.get("Authorization");
        console.log("**** ", bearer);
        if(!bearer) throw "Session Expired"; 

        let token = bearer.split(" ")[1];
        if(req.session.token != token) throw "Session Expired" //CHANGE THIS TO REQ.SESSION
        // console.log("***", token, req.session);
        // let payload = jwt.verify(token, process.env.TOKEN_SECRET);
        // if(!payload || payload.user.email != req.params.email) throw "Session Expired";

        next();
    } catch(err) {
        res.status(401).json({message : err})
    }
   
}