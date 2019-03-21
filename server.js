const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

// connect to the DB
mongoose.connect(process.env.DB, { useNewUrlParser: true })
        .then(() => console.log(`Database connected successfully`))
        .catch(err => console.log('err in mongoose.connect: ', err));

// mongoose promise is deprecated
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
        //heps solve CORS issue if accessing from a different domain
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
        res.send('hello world');
});

app.post('/practice_post', function(req, res) {
        console.log('req.body: ', req.body);
        res.send({
                name: 'Logan Wood',
                email: '123@abc.com'
        });
});

app.listen(port, () => {
        console.log(`Server running on port ${port}`);
});
