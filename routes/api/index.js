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
        const data = {...Classes[category].data};
        const newData = (category === "leads") ? await Functions.processLeadData(data) : await Functions.processData(data);
        res.status(200).json(newData);
    })

    router.get('/getData/:category/:id', verifyToken, async (req, res) => {
        const category = req.params.category;
        const id = req.params.id;
        const data = {...Classes[category].data};
        let dataToThrow = {};
        dataToThrow[id] = {...data[id]};
        const newData = (category === "leads") ? await Functions.processLeadData(dataToThrow) : await Functions.processData(dataToThrow);
        res.status(200).json(newData);
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
            const id = req.params.id;
            const allData = await dataParser.readFile(category);
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
            const id = req.params.id;
            const allData = await dataParser.readFile(category);
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