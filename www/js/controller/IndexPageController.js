/*jslint browser: true*/
/*global console, MyApp*/

MyApp.angular.controller('IndexPageController', ['$scope', '$rootScope', '$http', 'InitService', 'AxelibService', function ($scope, $rootScope, $http, InitService, AxelibService) {
    
	'use strict';
	
	var self = this;

    InitService.addEventListener('ready', function () {
        // DOM ready
        console.log('IndexPageController: ok, DOM ready');
    });
	
	$scope.total = 0;
	$scope.search = "";
	$scope.articles = [];
	$scope.categories = [];
	$scope.currentcategory = "";
	$scope.panier = global.pan;
	
	$scope.init = function() {
		$scope.TheCategory = "Tout";
		global.compiledpages.push("home");
		$scope.currentcategory = "";
        self.getarticles();
        self.getcategories();
		self.mapart();
	};
	
	$scope.SetCat = function(name) {
		$scope.currentcategory = name;
	};
	
	$scope.gopay = function() {
		var toast = MyApp.fw7.app.toast.create({ text: 'Le panier est vide !' });
		global.price = $scope.total;
		if ($scope.total <= 0) {
			toast.open();
			return;
		}
		mainView.router.navigate('/page1/');
	};
	
	$scope.AddArticle = function(a) {
		$scope.total = $scope.total + parseInt(a.price);
		global.price = $scope.total;
        global.listarticles.push(a);
        $$(".pos-cart").html(global.listarticles.length);
		$rootScope.$broadcast('AddArticle', a);
        self.mapart();
	};
	
	$scope.ShowSheet = function(a) {
		global.article = a;
		$$("#pos-mobile-search").blur();
		$$("#pos-article-img").attr("src", a.image.large);
		$$(".pos-article-name span").html(a.name);
		$$(".pos-article-price span").html(a.price + ",00");
		$$(".pos-article-description").html(a.description);
		$$(".list-cat").html("");
		for(let i = 0; i < global.article.link_articlecategorys.length; i++) {
			let cat = self.GetCategoryName(global.article.link_articlecategorys[i].id_category);
			if (cat != null)
				$$(".list-cat").append('<li>' + cat.name + '</li>');
		}
		ac3.open();
	};
	
	self.GetCategoryName = function(id) {
		let cat = null;
		for(let i = 0; i < $scope.categories.length; i++) {
			if (id == $scope.categories[i].id) {
				cat = $scope.categories[i];
			}
		}
		return cat;
	};
	
    $scope.cancelorder = function() {
        global.listarticles = [];
        $scope.panier = [];
        $(".pos-cart").html(0);
        $scope.total = 0;
        self.sync();
        $scope.closeModal();
    };
	
	$scope.emptysearch = function() {
		$scope.search = "";
		self.sync();
		$$("#pos-mobile-search").focus();
	};
    
	$scope.compute = function() {
		self.mapart();
	};
	
	self.getarticles = function()  {
		let data = {
			"linkedto": "link_articlecategory:id_article",
			"join:link_articlecategory": "id=link_articlecategory.id_article",
			"plus:name in category": "category_name:link_articlecategory.id_category=category.id"
		};
		AxelibService.list("article", data, "all").then(function(e, g, t) {
			var items = [];
            if (e.hasOwnProperty('length') && e.length > 0) {
                var count = e.length;		    //Total count of records in entity
                var nbResult = e.length;        //Number of results
                $scope.articles = e;			//Records returned
                global.articles = e;			//Records returned
                self.sync();
                console.log(e);
            }
		}, function() {
			console.warn('ko');
		});
    };
	
    self.getcategories = function()  {
		//$scope.categories = global.cats;
        if ($scope.categories.length > 0) return;
        $scope.categories.push({ name: "Tout" });
        $scope.myCategory = $scope.categories[0];
		AxelibService.list("category", null, "all").then(function(e, g, t) {
			var items = [];
            if (e.hasOwnProperty('length') && e.length > 0) {
                var count = e.length;		    //Total count of records in entity
                var nbResult = e.length;        //Number of results
                $scope.categories = e;			//Records returned
                global.categories = e;			//Records returned
                //$scope.categories = MyApp.ax.collection.ConcatArray($scope.categories, e);			//Records returned
                self.sync();
                console.log(e);
            }
		}, function() {
			console.warn('ko');
		});/*
        ax.ServerCall("list", "category", null, "all", function(e, g, t) {
            var items = [];
            if (e.hasOwnProperty('length') && e.length > 0) {
                var count = g.count;		    //Total count of records in entity
                var nbResult = e.length;        //Number of results
                $scope.categories = ax.collection.ConcatArray($scope.categories, e);			//Records returned
                self.sync();
            }
        }, function(e, a, t) {
            console.warn("echec !");
        });*/
    };
	
	$scope.filtercategory = function(article) {
		let cat = $scope.TheCategory, id = null, ret = true;
		if (cat == "Tout") {
			return ret;
		}
		else {
			for(let i = 0; i < $scope.categories.length; i++) {
				if (cat == $scope.categories[i].name) {
					id = $scope.categories[i].id;
				}
			}
			if (id != null) {
				let found = false;
				for(let i = 0; i < article.link_articlecategorys.length; i++) {
					if (id == article.link_articlecategorys[i].id_category) {
						found = true;
					}
				}
				ret = found;
			}
		}
		return ret;
	};
	
	$scope.ChangeCategory = function() {
		console.log($scope.TheCategory);
	};
    
	self.mapart = function() {
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
        $$(".pos-cart").html(global.listarticles.length);
        self.sync();
    };
	
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
    
}]);

