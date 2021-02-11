const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.listen(port, () => {
  console.log('Server is running on port : ', port);
});

module.exports = app;
