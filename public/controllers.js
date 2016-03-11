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
			console.log(res.data);
		}, function(err) {
			console.error(err);
		});
	};

	$scope.drawStuff = function() {
		$scope.drawSomething = true;
	};

	$scope.showModal = function($scope) {
		var this.showcase = $scope.drawing;
	};
});