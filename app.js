//To get process env variables
require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const compression = require('compression');
const mongoose = require('mongoose');

//Middleware functions
app.use(express.json({ limit: '100mb' }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());
app.use(compression({ filter: shouldCompress }));

//MongoDB Atlas
//const mongoURI = `mongodb+srv://${process.env.NAME}:${process.env.PASS}@dev-02rqv.mongodb.net/dbname?retryWrites=true&w=majority`

//Localhost
const mongoURI = `mongodb://localhost:27017/development`

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err) {
    if (err) console.log(err)
    else console.log('Connected to MongoDB');
});

app.use('/create',require('./insert_data'));

app.use('/relation',require('./relations'));

function shouldCompress(req, res) {
    if (req.headers["x-no-compression"]) return false;
    return compression.filter(req, res);
}

http.createServer(app).listen(80);


