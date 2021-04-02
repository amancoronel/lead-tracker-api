class Addresses {
    constructor() {
        this.addresses = {};
    }

    get data() {
        console.log("TEST");
        return this.addresses;
    }

    set data(address) {
        this.addresses = address;
    }

    getSingleData(id) {
        return this.addresses[id];
    }
}

module.exports = Addresses;