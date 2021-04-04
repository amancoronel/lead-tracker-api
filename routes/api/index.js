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
        res.status(200).json(data);
    })

    router.get('/getData/:category/:id', verifyToken, async (req, res) => {
        const category = req.params.category;
        const id = req.params.id;
        let data = Classes[category].data;
        data = (category === "transaction") ? await Functions.processTransactionData(data[id]) : await Functions.processData(data[id]);
        res.status(200).json(data);
    })

    router.post('/addNewData/:category', verifyToken, async (req, res) => {
        try {
            const category = req.params.category;
            const allData = await dataParser.readFile(category); //JSON FILE READER
            const dataExist = await Functions.validator(category, allData, req.body); //CHECKER IF DATA EXISTS IN DB
            if(dataExist && dataExist.length > 0) throw "Data exist";
            const id = v4uuid(); // RANDOM ID
            allData[id] = {...req.body, id} //ADDED ID TO REQUEST BODY
            await dataParser.writeFile(category, allData);
            Classes[category].data = allData;
            res.status(200).json(allData);
        } catch(e) {
            res.status(400).json({message: e});
        }
        
    })

    router.put('/updateData/:category/:id', verifyToken, async (req, res) => {
        try {
            const category = req.params.category;
            const allData = await dataParser.readFile('category');
            if(!allData[id]) throw "Record not found";
            allData[id] = req.body;
            await dataParser.writeFile(category, allData);
            Classes[category].data = allData;
            res.send(allData);
        } catch(e) {
            res.status(400).json({message: e});
        }
        
    })

    router.delete('/deleteData/:category/:id', verifyToken, async (req, res) => {
        try {
            const category = req.params.category;
            const allData = await dataParser.readFile('category');
            if(!allData[id]) throw "Record not found";
            delete allData[id];
            await dataParser.writeFile(category, allData);
            Classes[category].data = allData;
            res.send(allData);
        } catch(e) {
            res.status(400).json({message: e});
        }
    })
    
module.exports = router