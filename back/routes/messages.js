var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');

var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'scratch'
});

db.connect();

var messages = {
        id_user: '',
        message: ''
    };


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Récupérer les messages
router.get('/', function(req, res, next) {
    var sql = "SELECT u.id_user, id_msg, nom_user, msg.message, msg.created_at, msg.modified_at FROM messages as msg, users as u WHERE msg.id_user = u.id_user ORDER BY id_msg";
    db.query(sql, function(error, results, fields){
        if (error) throw error;
        res.json(results);
    });
});

// Récupérer les messages par user
router.get('/:user', function(req, res, next) {

    var user_id = req.params.user;

    var sql = "SELECT u.id_user, nom_user, msg.message, msg.created_at, msg.modified_at FROM messages as msg, users as u WHERE msg.id_user = u.id_user AND msg.id_user = ?";

    db.query(sql, user_id, function(error, results, fields){
        if (error) throw error;
        res.json(results)
    });
});

// Poster un message
router.post('/', function(req, res, next) {

    messages.id_user = req.body.id_user;
    messages.message = req.body.message;
    var sql2 = "SELECT u.id_user,id_msg, nom_user, msg.message, msg.created_at, msg.modified_at FROM messages as msg, users as u WHERE msg.id_user = u.id_user AND msg.id_msg = ?";
    var sql = "INSERT INTO messages SET ?";

    db.query(sql,[messages] , function(error, results, fields){
        if (error) throw error;
        db.query(sql2, results.insertId, function(error2, results2, fields2){
            if (error2) throw error2;

            res.json(results2[0]);
        });
    });
});

router.delete('/:id_msg', function(req, res, next) {
    var id_msg = req.params.id_msg;
    var sql = "DELETE FROM messages WHERE id_msg = ? ";
    db.query(sql, id_msg, function(error, results, fields){
        if (error) throw error;
        res.json(results.serverStatus);
    });
});

module.exports = router;
