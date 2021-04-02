const api = require('./api');
const Classes = require('../resources/classes');
const functionToken = require('../resources/functions/tokens');


module.exports = (app) => {
    app.use('/api', api);

    app.get('/', (req, res) => {
        res.send("HELLO WORLD");
    })

    app.post('/login', async (req, res) => {
        try {
            const userCred =  {...req.body.data};
            //Search if agent is existing
            const agents = Classes.agents.data;
            const userFound = Object.keys(agents).filter((x) => agents[x].email === userCred.email );
            if(!userFound || userFound.length < 1) throw "User not found"
            const user = agents[userFound[0]];
            //If user exist, generate token
            let token = await functionToken.getAuthId(user);
            if(!token) throw "Login failed"

            req.session.token = token;
            res.status(200).json({user, access_token: token});
        } catch(e) {
            res.status(400).json({message: e})
        } 
    })

    app.post('/logout', async(req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    })
}