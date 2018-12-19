const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database')


const app = express();


//checking for db connection
(async () => {
    try {
        const result = await db.sequelize.authenticate()
        console.log('database connection has been made');
    } catch (err) {
        console.log(err);
    }
})();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//initialize route
app.use('/user', require('./route/user'));

//error handler middleware
app.use((err, req, res, next) => {
    res.status(422).json(err);
})


//listening to port
app.listen(4000, () => {
    console.log('now listening on port 4000');
});
