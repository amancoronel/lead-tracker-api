const mongoose = require('mongoose');
mongoose.Promise = require('bluebird').Promise;

const dbUrl = "mongodb://localhost/brothersbuyhome"

const connection = mongoose.createConnection(dbUrl, {
    "useNewUrlParser": true,
    "useCreateIndex": true,
    "useUnifiedTopology": true,
    "useFindAndModify" : false,
    // "user" : "",
    // "pass" : ""
})

connection.on("connected", () => {
    console.log("Database connected");
})

exports.agents = require("./model-agents.js")(mongoose, connection);
exports.contractors = require("./model-contractors.js")(mongoose, connection);
exports.lenders = require("./model-lenders.js")(mongoose, connection);
exports.leads = require("./model-leads.js")(mongoose, connection);