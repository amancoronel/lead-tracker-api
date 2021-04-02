const fs = require('fs');
const path = require('path');

exports.readFile = (category) => {
    return new Promise((resolve, reject) => {
            const filePath = path.join(__dirname, `${category}.json`);
            const encoding = 'utf8';
            fs.readFile(filePath, encoding, (err, data) => {
                if(err || !data) {
                    console.log("*** ERROR", err.errno);
                    if(err.errno === -4058) exports.writeFile(category, {});
                    resolve({})
                }
                resolve(data && data.length ? JSON.parse(data) : {});
            })
    })
}

exports.writeFile = async (category, data) => {
    const filePath = path.join(__dirname, `${category}.json`);
    const encoding = 'utf8';
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), encoding, (err) => {
            if(err) reject(err);
            resolve();
        })

    })
}
