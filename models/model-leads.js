module.exports = (mongoose, connection) => {
    const LeadSchema = new mongoose.Schema({
        address:                {type: String},
        address_type:           {type: String},
        agent_id:               {type: String, required: true},
        contractor_id:          {type: String, required: true},
        lender_id:              {type: String, required: true},
        titleCompany_id:        {type: String, required: true},
        leadNumber:             {type: String},
        leadSource:             {type: String},
        renovation:             {type: String},
        hasEarnestMoneyDeposit: {type: String},
        isAssignedToContract:   {type: Boolean},
        isClosed:               {type: Boolean},
        isUnderRenovation:      {type: Boolean},
        isVacant:               {type: Boolean},
        status:                 {type: Boolean},
        holdback:               {type: String, default: 0},
        deposit:                {type: String, default: 0},
        lastTimeSpoken:         {type: String},
        notes:                  {type: String},
        closeDate:              {type: String},
        estimatedFinishDate:    {type: String},
        vacantDate:             {type: String},
        status:                 {type: Boolean, default: true}
    });

    return connection.model("leads", LeadSchema);
}