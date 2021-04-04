const Address = require('./addresses');
const Agent = require('./agents');
const Contractor = require('./contractors');
const Lender = require('./lenders');
const Leads = require('./leads');

exports.addresses = new Address();
exports.agents = new Agent();
exports.contractors = new Contractor();
exports.lenders = new Lender();
exports.leads = new Leads();
