const express = require('express');
const router = new express.Router();
const finalResult= require('./utils')

// define a base route
router.get('/home', (req, res) => {
    res.send("Welcome to GoZem Test API ");
});

router.post('/api/get_distance_and_time', (req, res) => {
    console.log('attributes ++++++++++++++++++++++++++++++++++++++',req);
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Define properties in body"
        });
    } else if (req.body.hasOwnProperty('start') && req.body.hasOwnProperty('end') &&
        req.body.hasOwnProperty('units')) {
            finalResult(req, res);
    } else {
        return res.status(400).send({
            message: "Verify properties"
        });
    }
});

module.exports = router;