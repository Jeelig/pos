MyApp.angular.controller('MainController', ['$scope', '$compile', '$rootScope', function($scope, $compile, $rootScope) {
    
    global.compiledpages = [];
    var compiledonce = ["home", "tabs-swipeable"];
	
	$scope.code = "";
	
	$scope.menu = [{
		name: "Accordion",
		path: "/accordion/"
	}, {
		name: "Action sheet",
		path: "/action-sheet/"
	}, {
		name: "Badge",
		path: "/badge/"
	}, {
		name: "Buttons",
		path: "/buttons/"
	}, {
		name: "Cards",
		path: "/cards/"
	}, {
		name: "Checkbox",
		path: "/checkbox/"
	}, {
		name: "Chips/Tags",
		path: "/chips/"
	}, {
		name: "Contacts List",
		path: "/contacts-list/"
	}, {
		name: "Data Table",
		path: "/data-table/"
	}];

    var cancompile = function(PageName) {
        let res = true;
        if ((compiledonce.indexOf(PageName) >= 0) &&            // Page should be compiled once
            (global.compiledpages.indexOf(PageName) >= 0)) {    // Page has already been compiled
            res = false;
        }
        return res;
    };

    //$$(document).on('page:afterin', function(e) {
    $$(document).on('page:beforein', function(e) {
        // Never recompile index page
        var page = e.detail;
        if (cancompile(page.name) || (e.target.className.indexOf("ng-scope")<=0)) {
            // Ajax pages must be compiled first
            $compile(e.target)($scope);
            $scope.$apply();
            if (global.compiledpages.indexOf(page.name) < 0) {
                global.compiledpages.push(page.name);
            }
        }
        // Send broadcast event when switching to new page
        $rootScope.$broadcast(page.name + 'PageEnter', e);
    });
	/*
	$$(document).on('popup:open', function (e) {
		$compile(e.target)($scope);
        $scope.$apply();
        // Send broadcast event when switching to new page
        $rootScope.$broadcast('PopupEnter', e);
	});*/

    $$(document).on('pageAfterAnimation', function(e) {
        // Send broadcast if a page is left
        var fromPage = e.detail.page.fromPage;
        if (fromPage) {
            $rootScope.$broadcast(fromPage.name + 'PageLeave', e);
            if (fromPage.name != 'tabs-swipeable') {
                var prevPage = angular.element(document.querySelector('#'+fromPage.name));
                prevPage.remove();
            }
        }
    });

	$scope.Pay = function() {
		//MyApp.fw7.app.views.main.router.navigate('/page1/');
	};
	
	$scope.SetProfile = function(a) {
		$scope.profile = a;
		self.sync();
	};
	
	$scope.SetCode = function() {
		$scope.code = global.code;
		self.sync();
	};
    
    self.sync = function () {
        if (!$scope.$$phase) {
            $scope.$digest();
            $scope.$apply();
        }
    };
	
    $scope.logout = function() {
        MyApp.ax.user = null;
        MyApp.ax.session = null;
        MyApp.ax.store.del("session");
        global.compiledpages = [];
        MyApp.fw7.app.views.main.router.navigate('/');
    };

}]);