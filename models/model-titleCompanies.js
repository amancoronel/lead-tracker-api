module.exports = (mongoose, connection) => {
    const CompaniesSchema = new mongoose.Schema({
        name :              {type: String},
        contact_person :    {type: String},
        status:             {type: Boolean, default: true}
    });

    return connection.model("title_companies", CompaniesSchema);
}