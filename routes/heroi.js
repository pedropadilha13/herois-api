'use strict';
var Database = require('../Database');
var isNull = require('../public/javascripts/script').isNull;

var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    //res.json(["Please specify id"]);
    Database.query('SELECT * FROM Heroi', (error, results, fields) => {
        if (error) {
            res.send(error);
        } else {
            res.json(results);
        }
    });
});

router.get('/:id', (req, res, next) => {
    Database.query(`SELECT * FROM Heroi WHERE id = ${req.params.id}`, (error, results, fields) => {
        if (error) {
            res.send(error);
        } else {
            res.json(results);
        }
    });
});

router.post('/', (req, res, next) => {
    var heroi = req.body;
    if (isNull(heroi.nome || isNull(heroi.nacionalidade))) {
        res.json({error: "Fields 'nome' and 'nacionalidade' cannot be set to null!"});
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
});

router.put('/', (req, res, next) => {
    var heroi = req.body;
    if (isNull(heroi.id)) {
        res.status(400).json({error: "Cannot update row without id"});
    } else if (isNull(heroi.nome) || isNull(heroi.nacionalidade)) {
        res.status(400).json({error: "Invalid values for nome and/or nacionalidade"});
    } else {
        var querystring = buildQS(heroi);
        Database.query(querystring, (error, results, fields) => {
            if (error) {
                res.send(error);
            } else {
                res.send(results);
            }
        });
    }
});

router.delete('/',(req, res, next) => {
    var id = req.body.id;
    if (isNull(id)) {
        res.json({"error": "Cannot delete without id"});
    } else {
        Database.query(`DELETE FROM Heroi WHERE id = ${id}`,(error, results, fields) => {
            if (error) {
                res.send(error);
            } else {
                res.send(results);
            }
        });
    }
});

function buildQS(heroi) {

    var idOk = heroi.id;
    var nomeOk = !isNull(heroi.nome);
    var nacionalidadeOk = !isNull(heroi.nacionalidade);
    var data_nasc = heroi.data_nasc;
    var querystring;

    /*if (!idOk || !data_nasc && !(nomeOk || nacionalidadeOk)) {
        return;
    } else {*/
        querystring = `UPDATE Heroi SET `;

        if (nomeOk) {
            querystring += `nome = '${heroi.nome}'`;
        }
        
        if (nacionalidadeOk) {
            if (nomeOk) {
                querystring += ", ";
            }
            querystring += `nacionalidade = '${heroi.nacionalidade}'`;
        }
        
        if (heroi.data_nasc) {
            if (nacionalidadeOk || (nomeOk && !nacionalidadeOk)) {
                querystring += ", ";
            }
            querystring += `data_nasc = '${heroi.data_nasc}'`;
        }
        
        querystring += ` WHERE id = ${heroi.id}`;
        
        return querystring;
    //}
}

module.exports = router;
