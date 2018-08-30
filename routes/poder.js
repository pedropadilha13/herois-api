'use strict';
var Database = require('../Database');
var isNull = require('../public/javascripts/script').isNull;

var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    Database.query('SELECT * FROM Poder', (error, results, fields) => {
        if (error) {
            res.send(error);
        } else {
            res.json(results);
        }
    });
});

router.get('/:id', (req, res, next) => {
    Database.query(`SELECT * FROM Poder WHERE id = ${req.params.id}`, (error, results, fields) => {
        if (error) {
            res.send(error);
        } else {
            res.json(results);
        }
    });
});

router.post('/', (req, res, next) => {
    var titulo = req.body.titulo;
    if (isNull(titulo)) {
        res.json({error: "Field 'titulo' cannot be set to null!"});
    } else {
        var querystring = `INSERT INTO Poder (titulo) VALUES ('${titulo}')`;
        Database.query(querystring, (error, results, fields) => {
            if (error) {
                res.send(error);
            } else {
                res.json(results);
            }
        });
    }
});

router.put('/', (req, res, next) => {
    var poder = req.body;
    if (isNull(poder.id)) {
        res.status(400).json({error: "Cannot update row without id"});
    } else if (isNull(poder.titulo)) {
        res.status(400).json({error: "Invalid value for field 'titulo'"});
    } else {
        var querystring = `UPDATE Poder SET titulo = '${poder.titulo}' WHERE id = ${poder.id}`;
        Database.query(querystring, (error, results, fields) => {
            if (error) {
                res.send(error);
            } else {
                res.json(results);
            }
        });
    }
});

router.delete('/',(req, res, next) => {
    var id = req.body.id;
    if (isNull(id)) {
        res.json({"error": "Cannot delete without id"});
    } else {
        Database.query(`DELETE FROM Poder WHERE id = ${id}`,(error, results, fields) => {
            if (error) {
                res.send(error);
            } else {
                res.json(results);
            }
        });
    }
});

module.exports = router;