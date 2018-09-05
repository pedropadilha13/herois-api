'use strict';
var Database = require('../Database');
var isNull = require('../public/javascripts/script').isNull;

var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
	Database.query(`SELECT * FROM Lista_Poder`, (error, results, fields) => {
		if (error) {
			res.send(error);
		} else {
			res.json(results);
		}
	});
});

router.get('/heroi/:id', (req, res, next) => {
	var id = req.params.id;
	if (!isNaN(parseInt(id))) {
		Database.query(`SELECT Heroi.nome AS Nome, Poder.titulo as Poder
                        FROM Heroi
                        INNER JOIN Lista_Poder ON Heroi.id = Lista_Poder.id_heroi
                        INNER JOIN Poder On Lista_Poder.id_poder = Poder.id
                        WHERE Heroi.id = ${id}
                        `, (error, results, fields) => {
			if (error) {
				res.send(error);
			} else {
				res.json(results);
			}
		});
	} else {
		res.json({
			"error": "Cannot SELECT without id!"
		});
	}
});

router.get('/poder/:id', (req, res, next) => {
	var id = req.params.id;
	if (!isNaN(parseInt(id))) {
		Database.query(`SELECT Heroi.nome AS Nome, Poder.titulo as Poder
                        FROM Heroi
                        INNER JOIN Lista_Poder ON Heroi.id = Lista_Poder.id_heroi
                        INNER JOIN Poder On Lista_Poder.id_poder = Poder.id
                        WHERE Poder.id = ${id}
                        `, (error, results, fields) => {
			if (error) {
				res.send(error);
			} else {
				res.json(results);
			}
		});
	} else {
		res.json({
			"error": "Cannot SELECT without id!"
		});
	}
});

router.post('/', (req, res, next) => {
	var idHeroi = req.body.idHeroi;
	var idPoder = req.body.idPoder;
	if (isNull(idHeroi) || isNull(idPoder)) {
		res.json({
			error: "Fields 'idHeroi' and 'idPoder' cannot be set to null!"
		});
	} else {
		var querystring = `INSERT INTO Lista_Poder (id_heroi, id_poder) VALUES (${idHeroi}, ${idPoder})`;
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
	var listaPoder = req.body;
	if (isNull(listaPoder.id)) {
		res.status(400).json({
			error: "Cannot update row without id"
		});
	} else if (isNull(listaPoder.idHeroi) && isNull(listaPoder.idPoder)) {
		res.status(400).json({
			error: "Invalid value for fields 'id_heroi' or 'id_poder'"
		});
	} else {
		let querystring = buildQueryString(listaPoder);
		Database.query(querystring, (error, results, fields) => {
			if (error) {
				res.send(error);
			} else {
				res.json(results);
			}
		});
	}
});

router.delete('/', (req, res, next) => {
	var id = req.body.id;
	if (isNull(id)) {
		res.json({
			"error": "Cannot delete without id"
		});
	} else {
		Database.query(`DELETE FROM Lista_Poder WHERE id = ${id}`, (error, results, fields) => {
			if (error) {
				res.send(error);
			} else {
				res.json(results);
			}
		});
	}
});

function buildQueryString(listaPoder) {
	let querystring = 'UPDATE Lista_Poder SET ';
	if (listaPoder.idHeroi) {
		querystring += `id_heroi = ${listaPoder.idHeroi}`;
	}
	if (listaPoder.idPoder) {
		if (listaPoder.idHeroi) {
			querystring += ', ';
		}
		querystring += `id_poder = ${listaPoder.idPoder}`;
	}
	querystring += ` WHERE id = ${listaPoder.id}`;
	return querystring;
}

module.exports = router;
