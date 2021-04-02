const express = require('express');
const app = express();
require('dotenv').config(); // RUN DOT ENV TO GET .env FILE CONFIGURATION
const loader = require('./loader'); //LOAD ALL DATA TO CLASSES
const port = process.env.DEV_PORT || 8080;

require('./middleware')(app);
require('./routes')(app);

app.listen(port, () => {
    loader(); // LOAD DATA TO CLASSES
    console.log("server running at "+port);
});

