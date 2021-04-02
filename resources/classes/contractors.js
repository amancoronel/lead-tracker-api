class Contractors {
    constructor() {
        this.contractors = {}
    }

    get data() {
        return this.contractors;
    }

    set data(contractors) {
        this.contractors = contractors;
    }

    getSingleData(id) {
        return this.contractors[id];
    }
}

module.exports = Contractors;