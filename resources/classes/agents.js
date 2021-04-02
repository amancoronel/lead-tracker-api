class Agents {
    constructor() {
        this.agents = {}
    }

    get data() {
        return this.agents;
    }

    set data(agents) {
        this.agents = agents;
    }

    getSingleData(id) {
        return this.agents[id];
    }
}

module.exports = Agents;