const mongoose = require('mongoose');
mongoose.Promise = require('bluebird').Promise;

const config = require('../config');

const connection = mongoose.createConnection(config.DBUrlDev,config.DBOptions)

connection.on("connected", () => {
    console.log("Database connected");
})

exports.agents = require("./model-agents.js")(mongoose, connection);
exports.title_companies = require("./model-titleCompanies.js")(mongoose, connection);
exports.contractors = require("./model-contractors.js")(mongoose, connection);
exports.lenders = require("./model-lenders.js")(mongoose, connection);
exports.leads = require("./model-leads.js")(mongoose, connection);