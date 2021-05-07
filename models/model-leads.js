module.exports = (mongoose, connection) => {
    const LeadSchema = new mongoose.Schema({
        address:        {type: String},
        address_type:   {type: String},
        agent_id:       {type: String},
        contractor_id:  {type: String},
        lender_id:      {type: String},
        leadNumber:    {type: String},
        leadSource:     {type: String},
        renovation:     {type: String},
        titleCompany:   {type: String},
        hasEarnestMoneyDeposit: {type: String},
        isAssignedToContract: {type: Boolean},
        isClosed: {type: Boolean},
        isUnderRenovation: {type: Boolean},
        isVacant: {type: Boolean},
        status: {type: Boolean},
        closeDate:          {type: Date},
        estimatedFinish:    {type: Date},
        vacantDate:         {type: Date},
        status:             {type: Boolean, default: true}
    });

    return connection.model("leads", LeadSchema);
}