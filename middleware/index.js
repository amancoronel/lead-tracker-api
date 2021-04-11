const serveStatic = require('serve-static');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session')
const config = require('../config');


module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(cors({
        origin: 'https://lead-manager-client.herokuapp.com/',
        credentials: true
    }));
    //TO ACCESS URI ENDPOINT

    app.use(session({
        secret: config.SESSION_SECRET,
        resave:false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
    }));
}