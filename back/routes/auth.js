var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');

var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'scratch'
});

db.connect();

var users = {
    nom_user :  '',
    prenom_user :  '',
    email_user :  '',
    password_user :  ''
};

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

router.get('/users/me', checkAuthenticated , function(req, res, next) {

    var sql = "SELECT * FROM users WHERE id_user = ?";
    db.query(sql, req.user, function(error, results, fields){
        if (error) throw error;
        res.json(results[0]);
    });


});

router.post('/users/me', checkAuthenticated , function(req, res, next) {
    users.nom_user = req.body.nom_user;
    users.prenom_user = req.body.prenom_user;
    users.email_user = req.body.email_user;
    users.password_user = req.body.password_user;


    var sql = "UPDATE users SET nom_user = ?, prenom_user = ?, email_user = ?, password_user = ? WHERE id_user = ?";
    db.query(sql, [req.body.nom_user, req.body.prenom_user, req.body.email_user, req.body.password_user, req.user], function(error, results, fields){
        if (error) throw error;
        res.json('Modification effectué avec succès.');
    });
});

router.post('/login', function(req, res, next) {
    var sql = "SELECT * FROM users WHERE email_user = ?";
    db.query(sql, req.body.email, function(error, results, fields){
        if (error) throw error;
        var user = results[0];
        if(!user)
            sendAuthError(res);

        if(user.password_user == req.body.password)
            sendToken(user, res);
        else
            sendAuthError(res);
    });

});

// On crée un token l'or de l'ajout de l'utilisateur !
router.post('/register', function(req, res, next) {

    users.nom_user =  req.body.nom;
    users.prenom_user =  req.body.prenom;
    users.email_user =  req.body.email;
    users.password_user =  req.body.password;

    var sql = "INSERT INTO users (nom_user, prenom_user, email_user, password_user) VALUES (?,?,?,?)";
    db.query(sql, [req.body.nom, req.body.prenom, req.body.email, req.body.password], function (error, results, fields) {
        if (error) throw error;
        users.id_user = results.insertId;
        sendToken(users, res)
    });
});

function sendToken(user, res) {
    var token = jwt.sign(user.id_user, '123');
    res.json(
        {
            nom: user.nom_user,
            token: token
        });
}

function sendAuthError(res) {
    return res.json( { success: false, message: 'email ou password incorrect' } );
}

function checkAuthenticated(req, res, next) {
    if(!req.header('authorization'))
        return res.status(401).send({message: 'Unauthorized requested. Missing authentication header'});

    var token = req.header('authorization').split(' ')[1];

    var payload = jwt.decode(token, '123');


    if(!payload)
        return res.status(401).send({message: 'Unauthorized requested. Authentication is invalid'})

    req.user = payload;

    next();
}

module.exports = router;