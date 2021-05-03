const Classes = require('../classes');

exports.processLeadData = async (leadss, isSingle) => {
    let finalData = [];
    let leads = {...leadss};
    const leadsData = Object.values(leads).filter(x => x.status === true)
    return finalData = leadsData.map((trans) => {
        if(trans.status) {
            let data = {...trans};
            const agentData = {...Classes.agents.getSingleData(data.agent_id)};
            // const addressData = {...Classes.addresses.getSingleData(data.address_id)};
            const lenderData = {...Classes.lenders.getSingleData(data.lender_id)};
            const contractorData = {...Classes.contractors.getSingleData(data.contractor_id)};
            const agentName = `${agentData.first_name} ${agentData.middle_name} ${agentData.last_name}`;
            
            // delete addressData['id'];
            delete lenderData['id'];
            delete contractorData['id'];
            // return {...data, agentData: agentName, addressData, lenderData, contractorData};
            return {...data, agentData: agentName, lenderData, contractorData};
        }
    })
}

exports.processData = async (data) => {
    let data1 = {...data}
    const dataFiltered = Object.values(data1).filter(x => x.status === true )
    let finalData = [];
    return finalData = dataFiltered.map((index) => {
        if(index.status) return {...index};
    })
}

exports.validator = require('./validator');
exports.db = require('./db');