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
        // const data = await Functions.db.getData({}, category);
        const newData = (category === "leads") ? await Functions.db.getLeadData({}) : await Functions.db.getData({}, category);
        console.log("NEW DATAAAAAAAA", newData);
        res.status(200).json(newData);
    })

    router.get('/getData/:category/:id', verifyToken, async (req, res) => {
        const category = req.params.category;
        const id = req.params.id;
        const data = {...Classes[category].data};
        let dataToThrow = {};
        dataToThrow[id] = {...data[id]};
        const newData = (category === "leads") ? await Functions.processLeadData(dataToThrow, true) : await Functions.processData(dataToThrow);
        res.status(200).json(newData);
    })

    router.post('/addNewData/:category', verifyToken, async (req, res) => {
        try {
            const category = req.params.category;
            req.body[status] = true;
            await Functions.db.addData(req.body, category);
            const newData = await Functions.db.getData({}, category);
            // const newData = (category === "leads") ? await Functions.processLeadData(dataToThrow, false) : await Functions.processData(dataToThrow);
            res.status(200).json(newData);
        } catch(e) {
            console.log("************ ERROR", e);
            res.status(203).json({message: e});
        }
        
    })

    router.put('/updateData/:category/:id', verifyToken, async (req, res) => {
        try {
            const category = req.params.category;
            const id = req.params.id;
            delete req.body.id;
            await Functions.db.updateData({ "_id" : id}, req.body, category);
            const dataToThrow = await Functions.db.getData({}, category);
            // const newData = (category === "leads") ? await Functions.processLeadData(dataToThrow, false) : await Functions.processData(dataToThrow);
            console.log("******** data", dataToThrow);
            res.send(dataToThrow);
        } catch(e) {
            res.status(203).json({message: e});
        }
        
    })

    router.delete('/deleteData/:category/:id', verifyToken, async (req, res) => {
        try {
            const category = req.params.category;
            const id = req.params.id;
            await Functions.db.updateData({ "_id" : id}, { status : false }, category);
            const allData = await Functions.db.getData({}, category);
            res.send(allData);
        } catch(e) {
            res.status(400).json({message: e});
        }
    })
    
module.exports = router