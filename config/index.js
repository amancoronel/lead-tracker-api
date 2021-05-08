const { v4: uuidv4 } = require('uuid');
const randomSecret = uuidv4();

exports.TOKEN_SECRET = randomSecret;
exports.SESSION_SECRET = 'gBpwmwE0PmyDKPuLhhmY8CONJQW3TnCujQuoE8nVao';
exports.DBUrl = "mongodb+srv://brothersbuyhomes:Br0th3rsBuyH0m3sTr5ck3r@brotherscluster.vbi8c.mongodb.net/brothersbuyhomes?retryWrites=true&w=majority";
exports.DBUrlDev = "mongodb+srv://brothersbuyhomes:Br0th3rsBuyH0m3sTr5ck3r@brotherscluster.vbi8c.mongodb.net/brothersbuyhomesDEV?retryWrites=true&w=majority";
exports.DBOptions = {
    "useNewUrlParser": true,
    "useCreateIndex": true,
    "useUnifiedTopology": true,
    "useFindAndModify" : false,
    // "user" : "",
    // "pass" : ""
}