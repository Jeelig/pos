/*jslint browser: true*/
/*global console, MyApp*/

MyApp.angular.controller('PanierController', ['$scope', '$rootScope', 'InitService', function ($scope, $rootScope, InitService) {
    
	'use strict';
	
	var self = this;
	var rootEvents = [];
	
	$scope.panier = [];
	$scope.total = 0;

    InitService.addEventListener('ready', function () {
        // DOM ready
        console.log('PanierController: ok, DOM ready');
    });
	
	$scope.init = function() {
		$scope.total = global.price;
		self.sync();
	};
	
	$scope.ReceiveArticles = function(a) {
		self.computecart();
		self.sync();
	};
	
	$scope.pay = function() {
		var toast = MyApp.fw7.app.toast.create({ text: 'Le panier est vide !' });
		global.price = $scope.total;
		if ($scope.total <= 0) {
			toast.open();
			return;
		}
		MyApp.fw7.app.views.main.router.navigate('/page1/'/*, { animate: false }*/);
	};
	
	$scope.SetArticle = function(a) {
		let subtotal = a.price * a.quantity;
		global.article = a;
		$$("#sheet-price-article").html(a.name);
		$$("#sheet-price-price").html(subtotal + ",00");
		stepper.setValue(a.quantity);
	};
	
	$scope.SetCountForArticle = function(n) {
		for (let i = 0; i < $scope.panier.length; i++) {
			if (global.article.id == $scope.panier[i].id) {
				$scope.panier[i].quantity = n;
			}
		}
		self.sync();
		self.computecart();
	};
	
	$scope.cancelorder = function() {
		$scope.panier = [];
		$scope.total = 0;
		global.price = 0;
		global.listarticles = [];
		$scope.SetCountForArticle(0);
		self.sync();
		setTimeout(function() {
			MyApp.fw7.app.popup.close();
		}, 350);
	};
	
	// Computes the current content of the cart
	self.computecart = function() {
		$scope.total = 0;
        $scope.panier = [];
        for(let i = 0; i < global.listarticles.length; i++) {
            if (!self.alreadythere(global.listarticles[i].id)) {
                let article = global.listarticles[i];
                article.quantity = 1;
                $scope.panier.push(global.listarticles[i]);
            }
            else {
                for(let j = 0; j < $scope.panier.length; j++) {
                    if ($scope.panier[j].id == global.listarticles[i].id) {
                        $scope.panier[j].quantity++;
                    }
                }
            }
            $scope.total = $scope.total + parseInt(global.listarticles[i].price);
        }
		global.price = angular.copy($scope.total);
        self.sync();
	};
	
	// Check if article is already in the cart
    self.alreadythere = function(id) {
        let exist = false;
        for(let i = 0; i < $scope.panier.length; i++) {
            if ($scope.panier[i].id == id) {
                exist = true;
            }
        }
        return exist;
    };
    
    self.sync = function () {
        if (!$scope.$$phase) {
            $scope.$digest();
            $scope.$apply();
        }
    };
	
	rootEvents.push($rootScope.$on('AddArticle', function(event, originalEvent) {
		$scope.ReceiveArticles(originalEvent);
	}));
	
	rootEvents.push($rootScope.$on('EmptyCart', function(event, originalEvent) {
		$scope.panier = [];
		$scope.total = 0;
		self.sync();
	}));
    
}]);