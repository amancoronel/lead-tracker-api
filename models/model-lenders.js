module.exports = (mongoose, connection) => {
    const LenderSchema = new mongoose.Schema({
        lender_name :       {type: String},
        point_of_contact:   {type: String},
        status:             {type: Boolean}
    });

    return connection.model("lenders", LenderSchema);
}