const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//setting up database
module.exports = new Sequelize('myDb', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: Op
});