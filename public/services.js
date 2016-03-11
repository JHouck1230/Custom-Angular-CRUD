'use strict';

var app = angular.module('drawApp');

app.service('DrawService', function($http) {
	this.fetch = function() {
		return $http.get('/drawings');
	};

	this.create = function(newDrawing) {
		return $http.post('/drawings', newDrawing);
	};

	this.remove = function(showcase) {
		return $http.delete(`/drawings/${showcase.id}`);
	};

	this.edit = function(showcase) {
		return $http.put(`/drawings/${showcase.id}`, showcase);
	};
});