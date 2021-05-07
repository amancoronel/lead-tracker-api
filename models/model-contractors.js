module.exports = (mongoose, connection) => {
    const ContractorSchema = new mongoose.Schema({
        contractor_name :   {type: String},
        contact_number :    {type: String},
        status:             {type: Boolean, default: true}
    });

    return connection.model("contractors", ContractorSchema);
}