const express = require('express');
const app = express();
require('dotenv').config(); // RUN DOT ENV TO GET .env FILE CONFIGURATION
const loader = require('./loader'); //LOAD ALL DATA TO CLASSES
const PORT = process.env.DEV_PORT || 3000;

require('./middleware')(app);
require('./routes')(app);

app.listen(PORT, () => {
    loader(); // LOAD DATA TO CLASSES
    console.log("server running at "+PORT);
});

