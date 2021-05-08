const api = require('./api');
const Classes = require('../resources/classes');
const functionToken = require('../resources/functions/tokens');
const functionDB = require('../resources/functions/db');


module.exports = (app) => {
    app.use('/api', api);

    app.get('/', (req, res) => {
        res.send("HELLO WORLD");
    })

    app.post('/login', async (req, res) => {
        try {
            if(req.session.token) {
                res.status(200).json({user : req.session.user, access_token: req.session.token});
            }
            const userCred =  {...req.body};
            //Search if agent is existing
            const user = await functionDB.getData({email : userCred.email}, "agents")
            if(!user || user.length < 1) throw "User not found"

            //If user exist, generate token
            let token = await functionToken.getAuthId(user[0]);
            if(!token) throw "Login failed"

            req.session.token = token;
            req.session.user = user[0];
            res.status(200).json({user, access_token: token});
        } catch(e) {
            res.status(203).json({message: e})
        } 
    })

    app.post('/logout', async(req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    })
}