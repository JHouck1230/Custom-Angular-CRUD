'use strict';

var app = angular.module('drawApp');

app.controller('drawCtrl', function($scope, DrawService) {
	DrawService.fetch()
	.then(function(res) {
		$scope.drawings = res.data;
	}, function(err) {
		console.error(err);
	});

	$scope.saveDrawing = function() {
		$scope.drawSomething = false;
		var canvas = document.getElementById('theCanvas');
		$scope.newDrawing.data = canvas.toDataURL();
		DrawService.create($scope.newDrawing)
		.then(function(res) {
			$scope.drawings.push(res.data);
		}, function(err) {
			console.error(err);
		});
	};

	$scope.drawStuff = function() {
		$scope.drawSomething = true;
	};

	$scope.showModal = function(drawing) {
		$scope.showcase = drawing;
	};

	$scope.removeDrawing = function(showcase) {
		var index = $scope.drawings.indexOf(showcase);
		DrawService.remove(showcase)
		.then(function(res) {
			$scope.drawings.splice(index, 1);
		}, function(err) {
			console.error(err);
		});
	};

	$scope.editDrawing = function() {
		$scope.editing = true;
	};

	$scope.submitEdit = function(showcase) {
		var drawings = $scope.drawings;
		$scope.editing = false;
		var index = $scope.drawings.indexOf(showcase);
		DrawService.edit(showcase)
		.then(function(res) {
			return drawings.map(function(drawing) {
				if(drawing.id === showcase.id) {
					for(var key in showcase) {
						drawing[key] = showcase[key];
					}
				}
				return drawing;
			});
		}, function(err) {
			console.error(err);
		});
	};
});