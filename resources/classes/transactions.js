class Transactions {
    constructor() {
        this.transactions = {}
    }

    get data() {
        return this.transactions;
    }

    set data(transactions) {
        this.transactions = transactions;
    }

    getSingleData(id) {
        return this.transactions[id];
    }
}

module.exports = Transactions;