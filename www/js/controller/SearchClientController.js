/*jslint browser: true*/
/*global console, MyApp*/

MyApp.angular.controller('SearchClientController', ['$scope', '$rootScope', 'InitService', function ($scope, $rootScope, InitService) {
    
	'use strict';
	
	var self = this;
	var rootEvents = [];
	
	$scope.client = null;
	$scope.searchClient = "";
	$scope.clients = [];
	
	$scope.noclient = "<i class='f7-icons'>person_crop_circle_badge_plus</i>";
	$scope.hasclient = "<i class='f7-icons'>person_crop_circle_badge_checkmark</i>";

    InitService.addEventListener('ready', function () {
        // DOM ready
        console.log('SearchClientController: ok, DOM ready');
    });
	
	$scope.init = function() {
		self.sync();
	};
	
	$scope.CleanClient = function() {
		$scope.client = null;
		global.client = null;
		$$(".alternate-user-icon").addClass("pale");
		$$(".alternate-user-icon").html($scope.noclient);
		$$(".alternate-user-icon").css("color", "darkgreen");
		setTimeout(function() {
			$$(".alternate-user-icon").css("color", "white");
		}, 500);
		self.sync();
	};
	
	$scope.CleanClientText = function() {
		$scope.searchClient = "";
		self.sync();
		$$("#searchClientInput").focus();
	};
	
	$scope.LinkClient = function(item) {
		
		global.client = item;
		$scope.client = item;
		$scope.searchClient = "";
		
		self.sync();
		
		$$(".alternate-user-icon").removeClass("pale");
		$$(".alternate-user-icon").html($scope.hasclient);
		$$(".alternate-user-icon").css("color", "darkgreen");
		setTimeout(function() {
			$$(".alternate-user-icon").css("color", "white");
		}, 500);
	};
	
	$scope.GetClients = function() {
		$scope.clients = MyApp.fw7.app.data.clients;
		self.sync();
	};
	
	rootEvents.push($rootScope.$on('EmptyCart', function(event, originalEvent) {
		$scope.client = null;
		self.sync();
	}));
	
    self.sync = function () {
        if (!$scope.$$phase) {
            $scope.$digest();
            $scope.$apply();
        }
    };
	
}]);