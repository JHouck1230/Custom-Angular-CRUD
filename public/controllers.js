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
		if($scope.newDrawing.title && $scope.newDrawing.artist) {
			$scope.drawSomething = false;
			var canvas = document.getElementById('theCanvas');
			$scope.newDrawing.data = canvas.toDataURL();
			DrawService.create($scope.newDrawing)
			.then(function(res) {
				console.log(res.data);
				$scope.drawings.push(res.data);
				$scope.cancelDrawing();
			}, function(err) {
				console.error(err);
			});
		};
	};

	$scope.cancelDrawing = function() {
		$scope.drawSomething = false;
		var canvas = document.getElementById('theCanvas');
		var canvasTmp = document.getElementById('theCanvasTmp');
		var context = canvas.getContext('2d');
		var contextTmp = canvasTmp.getContext('2d');
		if($scope.newDrawing.title) $scope.newDrawing.title = '';
		if($scope.newDrawing.artist) $scope.newDrawing.artist = '';
		canvas = context.clearRect(0, 0, canvas.width, canvas.height);
		canvasTmp = contextTmp.clearRect(0, 0, canvasTmp.width, canvasTmp.height);
	};

	$scope.drawStuff = function() {
		$scope.drawSomething = true;
	};

	$scope.populateModal = function(drawing) {
		$scope.showcase = drawing;
	};

  $scope.checkCancel = function() {
	  console.log("check cancel");
  };
  
  $scope.checkConfirm = function() {
    console.log("check confrim");
  };

  $scope.initDelete = function(showcase) {
		swal(
			{   
				title: "Are you sure?",
				text: "You will not be able to recover this drawing!",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Yes, delete it!",
				closeOnConfirm: false 
			}, function() {
				$scope.removeDrawing(showcase);
			})

	};

	$scope.removeDrawing = function(showcase) {
		var index = $scope.drawings.indexOf(showcase);
		DrawService.remove(showcase)
		.then(function(res) {
			$('#drawingModal').modal('hide');
			$scope.drawings.splice(index, 1);
			swal("Deleted!", "Your drawing has been erased.", "success"); 
			$scope.cancelDrawing();
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






