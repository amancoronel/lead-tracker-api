const Classes = require('../classes');

exports.processLeadData = async (leads) => {
    return finalData = Object.keys(leads).map((trans) => {
        let data = leads[trans];

        const agentData = Classes.agents.getSingleData(data.agent_id);
        const addressData = Classes.addresses.getSingleData(data.address_id);
        const lenderData = Classes.lenders.getSingleData(data.lender_id);
        const contractorData = Classes.contractors.getSingleData(data.contractor_id);
        
        const agentName = `${agentData.first_name} ${agentData.middle_name} ${agentData.last_name}`;
        
        delete addressData['id'];
        delete lenderData['id'];
        delete contractorData['id'];
        delete data['agent_id'];
        delete data['address_id'];
        delete data['lender_id'];
        delete data['contractor_id'];

        return {...data, agentData: agentName, addressData, lenderData, contractorData};
    })
}

exports.processData = async (data) => {
    return finalData = Object.keys(data).map((index) => {
        return {...data[index]};
    })
}

exports.validator = require('./validator');