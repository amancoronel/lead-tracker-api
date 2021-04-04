class Leads {
    constructor() {
        this.leads = {}
    }

    get data() {
        return this.leads;
    }

    set data(leads) {
        this.leads = leads;
    }

    getSingleData(id) {
        return this.leads[id];
    }
}

module.exports = Leads;