module.exports = (mongoose, connection) => {
    const LeadSchema = new mongoose.Schema({
        lead_number:    {type: String},
        agent_id:       {type: String},
        contractor_id:  {type: String},
        lender_id:      {type: String}
    });

    return connection.model("leads", LeadSchema);
}