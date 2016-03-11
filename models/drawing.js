'use strict';

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

var drawingsFilePath = path.join(__dirname, '../data/drawings.json');

exports.get = function(cb) {
	fs.readFile(drawingsFilePath, function(err, data) {
		if(err) return cb(err);
		var drawings = JSON.parse(data);
		cb(null, drawings);
	});
};

exports.write = function(newDrawing, cb) {
	fs.writeFile(drawingsFilePath, JSON.stringify(newDrawing), cb);
};

exports.create = function(newDrawing, cb) {
	this.get((err, drawings) => {
		if(err) return cb(err);
		newDrawing.id = uuid();
		drawings.push(newDrawing);
		this.write(drawings, cb);
	});
};

exports.delete = function(id, cb) {
	this.get((err, drawings) => {
		if(err) return cb(err);
		var length = drawings.length;
		drawings = drawings.filter((drawing) => {
			return drawing.id !== id;
		});
		if(length === drawings.length) return cb({err: "Shoe not found."});
		this.write(drawings, cb);
	});
};

exports.edit = function(id, updatesObj, cb) {
	this.get((err, drawings) => {
		if(err) return cb(err);
		var updatedDrawing;
		drawings = drawings.map((drawing) => {
			if(drawing.id === id) {
				for(var key in updatesObj) {
					drawing[key] = updatesObj[key];
				}
				updatedDrawing = drawing;
			}
			return drawing;
		});
		if(!updatedDrawing) return cb({err: "Shoe not found."});
		this.write(drawings, function(err) {
			if(err) return cb(err);
			cb(err, updatedDrawing);
		});
	});
};