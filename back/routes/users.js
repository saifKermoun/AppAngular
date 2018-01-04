var express = require('express');
var router = express.Router();
var app = express();
var mysql = require('mysql');

var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'scratch'
});

db.connect();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

/* GET users listing. */
router.get('/all' , function(req, res, next) {

    var sql = "SELECT * FROM users";
    db.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });
});

module.exports = router;
