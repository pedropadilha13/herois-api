'use strict';
var Database = require('../Database');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //res.json(["Please specify id"]);
    Database.query('SELECT * FROM Heroi', (error, results, fields) => {
        if (error) {
            res.send(error);
        } else {
            res.json(results);
        }
    });
});

router.get('/:id', function(req, res, next) {
    Database.query(`SELECT * FROM Heroi WHERE id_heroi = ${req.params.id}`, (error, results, fields) => {
        if (error) {
            res.send(error);
        } else {
            res.json(results);
        }
    });
});

router.post('/', (req, res, next) => {
    var heroi = req.body;
    if (!heroi.nome || !heroi.nacionalidade) {
        res.json({"error": "Fields nome and nacionalidade are NOT NULL!"});
    } else {
        var querystring = `INSERT INTO Heroi (nome, nacionalidade, data_nasc) VALUES ('${heroi.nome}', '${heroi.nacionalidade}', '${heroi.data_nasc}')`;
        Database.query(querystring, (error, results, fields) => {
            if (error) {
                res.send(error);
            } else {
                res.send(results);
            }
        });
    }
    res.status(200);
});

module.exports = router;
