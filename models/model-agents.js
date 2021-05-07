module.exports = (mongoose, connection) => {
    const AgentSchema = new mongoose.Schema({
        first_name :    {type: String},
        middle_name :   {type: String},
        last_name:      {type: String},
        email:          {type: String, unique: true},
        status:         {type: Boolean, default: true}
    })

    return connection.model("agents", AgentSchema);
}