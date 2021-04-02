class Lenders {
    constructor() {
        this.lenders = {}
    }

    get data() {
        return this.lenders;
    }

    set data(lenders) {
        this.lenders = lenders;
    }

    getSingleData(id) {
        return this.lenders[id];
    }
}

module.exports = Lenders;