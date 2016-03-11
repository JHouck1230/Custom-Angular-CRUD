'use strict';

var app = angular.module('drawApp');

app.service('DrawService', function($http) {
	this.fetch = function() {
		return $http.get('/drawings');
	};

	this.create = function(newDrawing) {
		return $http.post('/drawings', newDrawing);
	};
});