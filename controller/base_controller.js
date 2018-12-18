const db = require('../config/database')

module.exports =  class baseController {
    constructor() {
        this._db = db;
    }
}