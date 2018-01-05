var mysql = require("mysql");

var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'scratch'
});

module.exports = db;