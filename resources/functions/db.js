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
                    "lead_number" : "$lead_number",
                    "agent_id": 1,
                    "contractor_id": 1,
                    "lender_id": 1,
                    "agent_data" : { "$concat" : ["$agent_data.first_name"," ","$agent_data.last_name"] } ,
                    "contractor_data" : "$contractor_data.contractor_name",
                    "lender_data": "$lender_data.lender_name"
                } 
            }
        ])
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}