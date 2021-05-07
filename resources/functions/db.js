const Model = require('../../models');

exports.addData = async (data, category) => {
    let newData = new Model[category](data);
    return new Promise((resolve, reject) => {
        newData.save()
        .then(data => resolve(data))
        .catch(error => reject(error));
    })
}


exports.getData = async (condition = {}, category) => {
    return new Promise((resolve, reject) => {
        Model[category].find(condition)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}

exports.updateData = async (condition = {}, data, category) => {
    return new Promise((resolve, reject) => {
        Model[category].findOneAndUpdate(condition, { $set : data})
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}

exports.getLeadData = async (condition = {}) => {
    return new Promise((resolve, reject) => {
        Model.leads.aggregate([
            {
                $lookup : {
                    from: "agents",
                    localField: "agent_id",
                    foreignField: "_id",
                    as: "agent_data"
                }
            },
            {
                $unwind: "$agent_data",
            },
            {
                $lookup : {
                    from: "contractors",
                    localField: "contractor_id",
                    foreignField: "_id",
                    as: "contractor_data"
                }
            },
            {
                $unwind: "$contractor_data",
            },
            {
                $lookup: {
                    from: "lenders",
                    localField: "lender_id",
                    foreignField: "_id",
                    as: "lender_data"
                }
            },
            {
                $unwind: "$lender_data",
            },
            {
                "$project" : {
                    "_id" : "$_id",
                    "address": 1,
                    "address_type" : 1,
                    "agentData" : { "$concat" : ["$agent_data.first_name"," ","$agent_data.middle_name"," ","$agent_data.last_name"] } ,
                    "agent_id": 1,
                    "closeDate": 1,
                    "contractorData" : {
                        "contractor_name" : "$contractor_data.contractor_name",
                        "contact_number": "$contractor_data.contact_number",
                        "status" : "$contractor_data.status"
                    },
                    "contractor_id": 1,
                    "estimatedFinishDate": 1,
                    "hasEarnestMoneyDeposit": 1,
                    "isAssignedToContract": 1,
                    "isClosed" : 1,
                    "isUnderRenovation" : 1,
                    "isVacant" : 1,
                    "leadNumber" : 1,
                    "leadSource" : 1,
                    "lender_data": {
                        "lender_name" : "$lender_data.lender_name",
                        "point_of_contact" : "$lender_data.point_of_contact",
                        "status" : "$lender_data.status",
                    },
                    "lender_id": 1,
                    "renovation": 1,
                    "status": 1,
                    "titleCompany": 1,
                    "vacantDate" : 1
                } 
            }
        ])
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}