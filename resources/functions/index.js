const Classes = require('../classes');

exports.processLeadData = async (leadss, isSingle) => {
    let finalData = [];
    const leads = {...leadss};
    return finalData = Object.keys(leads).map((trans) => {
        let data = {...leads[trans]};
        const agentData = {...Classes.agents.getSingleData(data.agent_id)};
        const addressData = {...Classes.addresses.getSingleData(data.address_id)};
        const lenderData = {...Classes.lenders.getSingleData(data.lender_id)};
        const contractorData = {...Classes.contractors.getSingleData(data.contractor_id)};
        const agentName = `${agentData.first_name} ${agentData.middle_name} ${agentData.last_name}`;
        
        delete addressData['id'];
        delete lenderData['id'];
        delete contractorData['id'];
        if(!isSingle) {
            delete data['agent_id'];
            delete data['address_id'];
            delete data['lender_id'];
            delete data['contractor_id'];
        }

        return {...data, agentData: agentName, addressData, lenderData, contractorData};
    })
}

exports.processData = async (data) => {
    const data1 = {...data}
    let finalData = [];
    return finalData = Object.keys(data1).map((index) => {
        return {...data1[index]};
    })
}

exports.validator = require('./validator');