const Classes = require('./resources/classes');
const dataParser = require('./data');

module.exports = async () => {
    Classes.addresses.data = await dataParser.readFile('address');
    Classes.agents.data = await dataParser.readFile('agents');
    Classes.contractors.data = await dataParser.readFile('contractors');
    Classes.lenders.data = await dataParser.readFile('lenders');
    Classes.leads.data = await dataParser.readFile('leads');
}