const Sequelize = require('sequelize');
const models = require('../models/index');
const Op = Sequelize.Op;
const db = {}

//setting up database
const sequelize = new Sequelize('myDb', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: Op
});

Object.keys(models).forEach((modelName) => {
    const model = models[modelName](sequelize, Sequelize);
    db[modelName] = model;
    console.log(`loading model ${modelName}`);
})

Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db)
    }
})

sequelize.sync()

module.exports = Object.assign({}, db, {
    sequelize,
    Sequelize
})