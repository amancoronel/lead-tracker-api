const jwt = require('jsonwebtoken');
const config = require('../../config');
const Classes = require('../classes');

exports.getAuthId = async (info) => {
    let token = jwt.sign({user : info}, config.TOKEN_SECRET, {expiresIn : "1hr"});
    return token;
}

exports.verifyToken = async (req, res, next) => {
    try {
        // console.log("*****", req.session);
        let bearer = req.get("Authorization");
        // console.log("**** ", bearer);
        if(!bearer) throw "Session Expired"; 

        let token = bearer.split(" ")[1];


        let payload = jwt.verify(token, config.TOKEN_SECRET);
        const agents = Classes.agents.data;
        const userFound = Object.keys(agents).filter((x) => agents[x].email === payload.user.email );
        
        if(!userFound || userFound.length < 1) throw "User not found"
        
        next(); 
    } catch(err) {
        res.status(401).json({message : err})
    }
   
}