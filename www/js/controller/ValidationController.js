/*jslint browser: true*/
/*global console, MyApp*/

MyApp.angular.controller('ValidationController', ['$scope', '$rootScope', '$http', 'InitService', 'AxelibService', function ($scope, $rootScope, $http, InitService, AxelibService) {
    
	'use strict';
	
	var self = this;
	
	$scope.rendu = 0;
	$scope.searchClient = "toto";

    InitService.addEventListener('ready', function () {
        // DOM ready
        console.log('ValidationController: ok, DOM ready');
    });
	
	$scope.init = function() {
		$scope.mode = global.mode;
		$scope.total = global.price;
		self.sync();
		console.log($scope.mode);
	};
	
	$scope.pay = function() {
		
		if ($scope.mode == "cashmoney") {
            var t = $scope.given;//document.getElementById("ditoko").value;
            if (isNaN(parseInt(t)))
                return;
            if (parseInt(t) < parseInt($scope.total)) {
				var toast = MyApp.fw7.app.toast.create({ 
					text: 'Montant inférieur au panier !',
					position: "top"
				});
				toast.open();
                return;
			}
        }
        
		global.price = 0;
		global.client = null;
		global.listarticles = [];
		$rootScope.$broadcast('EmptyCart');
		MyApp.fw7.app.dialog.confirm("Imprimer le reçu ?", "Facturage", function() {
			MyApp.fw7.app.views.main.router.navigate('/', { animate: false, clearPreviousHistory : true });
		}, function() {
			MyApp.fw7.app.views.main.router.back('/', { animate: true, clearPreviousHistory : true });
		});
	};
	
	$scope.computerendu = function() {
		var t = $scope.given; //document.getElementById("ditoko").value;
        if (!isNaN(parseInt(t))) {
            if (parseInt(t) > parseInt($scope.total))
                $scope.rendu = parseInt(t) - parseInt($scope.total);
            else
                $scope.rendu = 0;
            self.sync();
        }
        else document.getElementById("ditoko").value = "";
	};
	
    self.sync = function () {
        if (!$scope.$$phase) {
            $scope.$digest();
            $scope.$apply();
        }
    };
    
}]);