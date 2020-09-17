var $$ = Dom7;

// Init angular
var MyApp = {};
MyApp.config = {};
var global = {
	compiledpages: [],
	listarticles: [],
	price: 0,
	code: ""
};

var cached = [
	{
		type: "html",
		path: "pages/page1.html"
	}, {
		type: "html",
		path: "pages/page2.html"
	}, {
		type: "html",
		path: "pages/ticket.html"
	}, {
		type: "html",
		path: "pages/client.html"
	}
];

var profiles = [{
	name: "Ericka",
	type: "user",
	code: "0561"
}, {
	name: "Lionel",
	type: "user",
	code: "0562"
}, {
	name: "Grace",
	type: "admin",
	code: "2503"
}, {
	name: "Gilles",
	type: "admin",
	code: "2525"
}];

MyApp.angular = angular.module('MyApp', []);
MyApp.axcode = document.getElementsByName('ax-code')[0].getAttribute('content');


MyApp.fw7 = {
	app : new Framework7({
		root: "#app", // App root element
		name: "My App", // App name
		theme: "md", // Automatic theme detection
		touch: {
			tapHold: true //enable tap hold events
		},
		toast: {
			closeTimeout: 2000,
			//closeButton: true,
		},
		sheet: {
			closeByBackdropClick: true,
			swipeToClose: true
		},
		// App root data
		data: function () {
			return {
				user: {
					firstName: "John",
					lastName: "Doe",
				},
			};
		},
		// App root methods
		methods: {
			helloWorld: function () {
				MyApp.fw7.app.dialog.alert("Hello World!");
			},
		},
		on: {
			// each object key means same name event handler
			pageInit: function (page) {
				// do something on page init
				//console.log(page.route);
				//if (mainView) console.log(mainView.router.history);
			},
			popupOpen: function (popup) {
				// do something on popup open
				//console.log(popup);
			},
		},
		// App routes
		routes: routes,
	}),
    views : []
};

var PopupCart = MyApp.fw7.app.popup.create({
	el: '.popup-cart',
	on: {
		open: function (popup) {},
		close: function() {
			angular.element(document.getElementById('HomePage')).scope().compute();
		}
	}
});

var PopupArticle = MyApp.fw7.app.popup.create({
	el: '.popup-article',
	on: {
		open: function (popup) {
			let img = global.article.image.large;
			$$("#pos-article-img").attr("src", img);
		}
	}
});


var stepper = MyApp.fw7.app.stepper.create({
	el: '.stepper',
	on: {
		change: function () {
			let price = stepper.value * global.article.price;
			$$("#sheet-price-price").html(price + ",00");
			if (stepper.value > global.article.quantity) {
				global.listarticles.push(global.article);
				global.article.quantity++;
			}
			else if(stepper.value < global.article.quantity) {
				global.listarticles = RemoveItemWithID(global.listarticles, global.article.id);
				global.article.quantity--;
			}
		}
	}
});


function RemoveItemWithID(arr, id) {
	for(let i = 0; i < arr.length; i++) {
		if (arr[i].id == id) {
			var index = arr.indexOf(arr[i]);
			arr.splice(index, 1);
			console.log("REMOVE : (" + id + ") " + arr[i]);
			//continue;
			break;
		}
	}
	return arr;
}


$$("#searchClientInput").on("keyup", function(e) {
	let text = $$(this).val();
	console.log(text);
});


/*
var app = new Framework7({
    root: "#app", // App root element
    name: "My App", // App name
    theme: "md", // Automatic theme detection
    // App root data
    data: function () {
        return {
            user: {
                firstName: "John",
                lastName: "Doe",
            },
            // Demo products for Catalog section
            products: [
                {
                    id: "1",
                    title: "Apple iPhone 8",
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.",
                },
                {
                    id: "2",
                    title: "Apple iPhone 8 Plus",
                    description: "Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!",
                },
                {
                    id: "3",
                    title: "Apple iPhone X",
                    description: "Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.",
                },
            ],
        };
    },
    // App root methods
    methods: {
        helloWorld: function () {
            app.dialog.alert("Hello World!");
        },
    },
	on: {
		// each object key means same name event handler
		pageInit: function (page) {
			// do something on page init
			console.log(page.route);
			if (mainView)
				console.log(mainView.router.history);
		},
		popupOpen: function (popup) {
			// do something on popup open
			console.log(popup);
		},
	},
    // App routes
    routes: routes,
});
*/
// Login Screen Demo
$$("#my-login-screen .login-button").on("click", function () {
    var username = $$('#my-login-screen [name="username"]').val();
    var password = $$('#my-login-screen [name="password"]').val();

    // Close login screen
    app.loginScreen.close("#my-login-screen");

    // Alert username and password
    app.dialog.alert("Username: " + username + "<br>Password: " + password);
});

$$(".pos-valid-count").on("click", function() {
	angular.element(document.getElementById('PanierPage')).scope().SetCountForArticle(stepper.value);
});

var mainView = MyApp.fw7.app.views.create(".view-main");
var ViewClient = MyApp.fw7.app.views.create(".view-clients");

//Check : mainView.router.history

var panelLeft = MyApp.fw7.app.panel.create({
    el: ".panel-left",
    resizable: true,
    //visibleBreakpoint: 1024,
    //collapsedBreakpoint: 768,
});

var panelRight = MyApp.fw7.app.panel.create({
    el: ".panel-right",
    resizable: true,
    visibleBreakpoint: 797,
});

$$("#globalsearch").on("blur", function (e) {
    let text = $$(this).val();
    if (text.length <= 0) {
        $$(".searchbar-disable-button").trigger("click");
    }
});

$$(".rmv-sch").on("click", function (e) {
    alert('');
});

var sheet1 = MyApp.fw7.app.sheet.create({
	el: '.my-sheet-swipe-to-close',
	swipeToClose: true,
	backdrop: true,
	swipeToClose: true,
	swipeToStep: true,
	swipeHandler: true
});

var sheet2 = MyApp.fw7.app.sheet.create({
	el: '.sheet-price',
	swipeToClose: true,
	backdrop: true,
	swipeToClose: true,
	swipeToStep: true,
	swipeHandler: true
});

/*var sheet3 = MyApp.fw7.app.sheet.create({
	el: '.sheet-search',
	swipeToClose: true,
	backdrop: true,
	swipeToClose: true,
	swipeToStep: true,
	swipeHandler: true,
	on: {
		open: function (sheet) {
			angular.element(document.getElementById('SearchClientPage')).scope().GetClients();
		}
	}
});*/

$$('.sheet-search').on('sheet:open', function (e) {
	angular.element(document.getElementById('SearchClientPage')).scope().GetClients();
});

var searchbar = MyApp.fw7.app.searchbar.create({
    el: ".pos-searchbar",
    on: {
        enable: function () {
            console.log("Searchbar enabled");
        },
        disable: function () {
            console.log("Searchbar disabled");
        },
        search: function () {
            console.log("Searchbar disabled");
        },
        clear: function () {
            console.log("Searchbar disabled");
        },
    },
});

searchbar.on("enable", function () {
    //console.log("Searchbar shown");
    $$(".payeur").hide();
});

searchbar.on("disable", function () {
    //console.log("Searchbar hidden");
    $$(".payeur").show();
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
	// Do something here when page loaded and initialized
	if (e.detail && e.detail.route && e.detail.route.params)
		global.query = e.detail.route.params;
	else global.query = null;
});

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
	// Do something here when page with data-name="about" attribute loaded and initialized
});

MyApp.ax = new Axelib({
	code:MyApp.axcode,
	version : 0.1
});



var ac3 = MyApp.fw7.app.actions.create({
    buttons: [
        // First group
        [
            {
                text: "Gérer cet article",
                label: true,
            },
            {
                text: "Voir l'article",
                bold: true,
				onClick: function () {
					//MyApp.fw7.app.dialog.alert('Button1 clicked');
					PopupArticle.open();
				}
            },
            {
                text: "Gérer la quantité",
            },
        ],
        // Second group
        [
            {
                text: "Cancel",
                color: "red",
            },
        ],
    ],
});
/*
$$('body').on('taphold', function (e) {
	//alert('Tap hold fired!');
	//alert("taphold detecté");
	alert(JSON.stringify(e));
	ac3.open();
});
*/

/*MyApp.angular.controller('counterCtrl', function ($scope) {
    $scope.counter = 0;
    $scope.countDown = function () {
        $scope.counter–;
    };
    $scope.countUp = function () {
        $scope.counter++;
    };
})*/
MyApp.angular.directive('ngHold', function ($timeout, $parse) {
    return {
        restrict: 'A',
        link: function ($scope, $elm, $attrs) {
            $elm.bind('touchstart', function (evt) {
                // Locally scoped variable that will keep track of the long press
                $scope.longPress = true;
                var functionHandler = $parse($attrs.ngHold);
                // We'll set a timeout for 700 ms for a long press
                $timeout(function () {
                    if ($scope.longPress) {
                        // If the touchend event hasn't fired,
                        // apply the function given in on the element's on-long-press attribute
                        $scope.$apply(function () {
                            functionHandler($scope, {$event: evt});
                        });
                    }
                }, 700);
            });

            $elm.bind('touchend', function (evt) {
                // Prevent the ngHold event from firing
                $scope.longPress = false;
                var functionHandler = $parse($attrs.ngHold);
                // If there is an on-touch-end function attached to this element, apply it
                if ($attrs.onTouchEnd) {
                    $scope.$apply(function () {
                        functionHandler($scope, {$event: evt});
                    });
                }
            });
        }
    };
});


$$(".client-results ul li").on("click", function() {
	let bl = "<i class='f7-icons'>person_crop_circle_badge_checkmark</i>";
	$$("#alternate-user-icon").html(bl);
	$$("#alternate-user-icon").removeClass("pale");
	$$("#alternate-user-icon").css("color", "darkgreen");
	setTimeout(function() {
		$$("#alternate-user-icon").css("color", "white");
	}, 500);
});


$$(".tyi table tr td div").on("click", function() {
	var self = $$(this);
	var val = self[0].innerText;
	self.toggleClass("active");
	setTimeout(function() {
		self.toggleClass("active");
	}, 200);
	TypedEnter(val);
});

function buyarticle() {
	angular.element(document.getElementById('HomePage')).scope().AddArticle(global.article);
}


function TypedEnter(v) {
	let scope = angular.element(document.getElementById('body')).scope();
	if (global.code.length == 4)
		global.code = "";
	global.code += v;
	scope.SetCode();
	if (global.code.length == 4) {
		setTimeout(function() {
			for(let i = 0; i < profiles.length; i++) {
				let profile = profiles[i];
				if (profile.code == global.code) {
					document.querySelector('.uppon').style.display = 'none';
					scope.SetProfile(profile);
					global.code = "";
					scope.SetCode();
					console.log("Welcome " + profile.name);
				}
			}
		}, 200);
	}
}

window.onload = function() {
	setTimeout(function() {
		for(let i = 0; i < cached.length; i++) {
			let item = cached[i];
			switch(item.type) {
				case "html":
					// XHR to request a JS and a CSS
					var xhr = new XMLHttpRequest();
					xhr.open('GET', item.path);
					xhr.send('');
					break;
				case "img":
					// preload image
					new Image().src = item.path;
			}
		}
	}, 1000);
};










