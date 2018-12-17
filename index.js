const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database')


const app = express();


//checking for db connection
db.authenticate()
    .then(() => {
        console.log('connection has been made');
    }).catch(err => {
        console.log('something went wrong', err);
    })


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', require('./route/user'));


//listening to port
app.listen(4000, () => {
    console.log('now listening on port 4000');
});
