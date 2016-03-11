'use strict';

var express = require('express');
var router = express.Router();

var Drawing = require('../models/drawing.js');

router.get('/', function(req, res) {
	Drawing.get(function(err, drawings) {
		if(err) return res.status(400).send(err);
		res.send(drawings);
	});
});

router.get('/:id', function(req, res) {
	var id = req.params.id;
	Drawing.get(function(err, drawings) {
		if(err) return res.status(400).send(err);
		var drawing = drawings.find(function(obj) {
			return obj.id === id;
		});
		if(!drawing) return res.status(400).send({err: "Drawing not found!"});
		res.send(drawing);
	});
});

router.post('/', function(req, res) {
	var newDrawing = req.body;
	Drawing.create(newDrawing, function(err) {
		if(err) return res.status(400).send(err);
		res.send(newDrawing);
	});
});

router.delete('/:id', function(req, res) {
	var id = req.params.id;
	Drawing.delete(id, function(err) {
		if(err) return res.status(400).send({err: "Drawing not found!"});
		res.send();
	});
});

router.put('/:id', function(req, res) {
	var id = req.params.id;
	var updatesObj = req.body;
	Drawing.edit(id, updatesObj, function(err, updatedDrawing) {
		if(err) return res.status(400).send({err: "Drawing not found!"});
		res.send(updatedDrawing);
	});
});

module.exports = router;