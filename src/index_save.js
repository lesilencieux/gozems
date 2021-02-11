const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const finalResult= require('./utils')

const port = process.env.PORT;
app.listen(port,()=>{
    console.log('Server is running on port : ',port);
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// define a base route
app.get('/home', (req, res) => {
    res.send("Welcome to GoZem Test API ");
});

app.post('/api/get_distance_and_time', (req, res) => {
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