const jwt = require('jsonwebtoken');
const config = require('../../config');
const Classes = require('../classes');

exports.getAuthId = async (info) => {
    let token = jwt.sign({user : info}, config.TOKEN_SECRET, {expiresIn : 28800});
    return token;
}

exports.verifyToken = async (req, res, next) => {
    try {
        let bearer = req.get("Authorization");
        if(!bearer) throw "Session Expired"; 
        let token = bearer.split(" ")[1];
        let payload = jwt.verify(token, config.TOKEN_SECRET);
        
        if(!payload) throw "Invalid token"
        next(); 
    } catch(err) {
        res.status(401).json({message : err})
    }
}