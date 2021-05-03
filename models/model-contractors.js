module.exports = (mongoose, connection) => {
    const ContractorSchema = new mongoose.Schema({
        contractor_name :   {type: String},
        status:             {type: Boolean}
    });

    return connection.model("contractors", ContractorSchema);
}