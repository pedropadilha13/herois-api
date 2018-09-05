'use strict';
var Database = require('../Database');
var isNull = require('../public/javascripts/script').isNull;

var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
	//res.json(["Please specify id"]);
	Database.query('SELECT * FROM Nacionalidade', (error, results, fields) => {
		if (error) {
			res.send(error);
		} else {
			res.json(results);
		}
	});
});

router.get('/:id', (req, res, next) => {
	Database.query(`SELECT * FROM Nacionalidade WHERE id = ${req.params.id}`, (error, results, fields) => {
		if (error) {
			res.send(error);
		} else {
			res.json(results);
		}
	});
});

router.post('/', (req, res, next) => {
	var codigo = req.body.codigo;
	if (isNull(codigo)) {
		res.json({
			error: "Field 'codigo' cannot be set to null!"
		});
	} else {
		var querystring = `INSERT INTO Nacionalidade (codigo) VALUES ('${codigo}')`;
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
	var nacionalidade = req.body;
	if (isNull(nacionalidade.id)) {
		res.status(400).json({
			error: "Cannot update row without id"
		});
	} else if (isNull(nacionalidade.codigo)) {
		res.status(400).json({
			error: "Invalid value for field 'codigo'"
		});
	} else {
		var querystring = `UPDATE Nacionalidade SET codigo = '${nacionalidade.codigo}' WHERE id = ${nacionalidade.id}`;
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
		Database.query(`DELETE FROM Nacionalidade WHERE id = ${id}`, (error, results, fields) => {
			if (error) {
				res.send(error);
			} else {
				res.json(results);
			}
		});
	}
});

module.exports = router;
