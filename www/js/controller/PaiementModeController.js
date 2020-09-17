/*jslint browser: true*/
/*global console, MyApp*/

MyApp.angular.controller('PaiementModeController', ['$scope', '$element', '$http', 'InitService', 'AxelibService', function ($scope, $element, $http, InitService, AxelibService) {
    
	'use strict';
	
	var self = this;
	
	self.dialog = null;
	self.dialog_fired = false;
	
	$scope.hasclient = "<i class='f7-icons'>person_crop_circle_badge_checkmark</i>";

    InitService.addEventListener('ready', function () { // DOM ready
        console.log('PaiementModeController: ok, DOM ready');
    });
	
	$scope.init = function() {
		self.dialog = null;
		self.dialog_fired = false;
		$scope.total = global.price;
		if (global.client != null) {
			$$(".alternate-user-icon").each(function() {
				$$(this).removeClass("pale");
				$$(this).html($scope.hasclient);
				$$(this).css("color", "darkgreen");
			});
			setTimeout(function() {
				$$(".alternate-user-icon").css("color", "white");
			}, 500);
		}
		self.sync();
		self.dialog = MyApp.fw7.app.dialog.create({
			title: 'Associer un client',
			text: 'Souhaitez-vous associer un client à cette facture ?',
			buttons: [
				{ text: 'Oui', },
				{ text: 'Non', }
			],
			onClick: function(dialog, index) {
				if (index == 0) {
					sheet3.open();
					self.dialog_fired = false;
				}
				else {
					MyApp.fw7.app.views.main.router.navigate('/page2/');
					self.killmodal();
				}
			},
			verticalButtons: true,
		});
	};
	
	self.killmodal = function() {
		setTimeout(function(e) {
			self.dialog.destroy();
		}, 500)
	};
	
	$scope.setpaiementmode = function(mode) {
		global.mode = mode;
		if (global.client == null) {
			if (!self.dialog_fired) {
				self.dialog.open();
				self.dialog_fired = true;
			}
		}
		else {
			MyApp.fw7.app.views.main.router.navigate('/page2/');
			self.killmodal();
		}
	};
	
    self.sync = function () {
        if (!$scope.$$phase) {
            $scope.$digest();
            $scope.$apply();
        }
    };
    
}]);