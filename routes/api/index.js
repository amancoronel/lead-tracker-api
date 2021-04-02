const express = require('express');
const router = express.Router();
const { v4: v4uuid} = require('uuid');
const dataParser = require('../../data');
const Classes = require('../../resources/classes');
const Functions = require('../../resources/functions');
const verifyToken = require('../../resources/functions/tokens').verifyToken;

    router.get('/', (req, res)  => {
        res.send("Welcome to API index");
    })

    router.get('/getAllData/:category', verifyToken, async (req, res) => {
        const category = req.params.category;
        let data = Classes[category].data;
        data = (category === "transaction") ? await Functions.processTransactionData(data) : await Functions.processData(data);
        res.send(data);
    })

    router.post('/addNewData/:category', verifyToken, async (req, res) => {
        const category = req.params.category;
        const allData = await dataParser.readFile(category);
        // allData[v4uuid()] = req.body;
        allData[v4uuid()] = {"name":"king arthur","password":"password1","profession":"king","id":1}
        await dataParser.writeFile(category, allData);
        Classes[category].data = allData;
        res.send(allData);
    })

    router.put('/updateData/:category/:id', verifyToken, async (req, res) => {
        const category = req.params.category;
        const allData = await dataParser.readFile('category');
        allData[id] = req.body;
        await dataParser.writeFile(category, allData);
        Classes[category].data = allData;
        res.send(allData);
    })

    router.delete('/deleteData/:category/:id', verifyToken, async (req, res) => {
        const category = req.params.category;
        const allData = await dataParser.readFile('category');
        delete allData[id];
        await dataParser.writeFile(category, allData);
        Classes[category].data = allData;
        res.send(allData);
    })
    
module.exports = router