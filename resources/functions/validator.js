module.exports = async (category, allData, data) => {
    let helper;
    switch(category) {
        case "addresses" :
            helper = "address";
        break;
        case "agents" :
            helper = "email";
        break;
        case "contractors":
            helper = "contractor_name";
        break;
        case "lenders" :
            helper = "lender_name";
        break;
    }

    return Object.keys(allData).filter((x) => allData[x][helper] === data[helper]);
}