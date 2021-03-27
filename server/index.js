const data = require('./data.json') 
const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3000;

app.use(cors())
app.get('/', (req, res) => {
    res.json(data);
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});