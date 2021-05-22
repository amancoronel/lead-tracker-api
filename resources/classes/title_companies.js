class TitleCompanies {
    constructor() {
        this.title_companies = {}
    }

    get data() {
        return this.title_companies;
    }

    set data(title_companies) {
        this.title_companies = title_companies;
    }

    getSingleData(id) {
        return this.title_companies[id];
    }
}

module.exports = TitleCompanies;