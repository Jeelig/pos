var $$ = Dom7;

// Init angular
var MyApp = {};
MyApp.config = {};
var global = {};

//alert("ok");

MyApp.angular = angular.module('MyApp', []);
MyApp.axcode = document.getElementsByName('ax-code')[0].getAttribute('content');

// Framework7 App main instance
MyApp.fw7 = {
	app : new Framework7({
		root: "#app", // App root element
		name: "POS app", // App Name
		id: "com.myapp.test", // App id
		theme: 'md', // Automatic theme detection : auto, ios or android
		statusbar: {
			iosOverlaysWebView: true
		},
		panel: {
			swipe: false,
			resizable: false
		},
		touch: {
			tapHold: true //enable tap hold events
		},
		themeColor: '#33CD5F',
		routes: routes,
		on: {
			pageInit: function (page) {
				console.log(page.route);
			},
			popupOpen: function (popup) {
				console.log(popup);
			},
		},
	}),
    views : []
};
/*
var app = new Framework7({
    root: "#app", // App root element
    name: "POS app", // App Name
    id: "com.myapp.test", // App id
	theme: 'md', // Automatic theme detection : auto, ios or android
    panel: {
        swipe: false,
		resizable: false
    },
	themeColor: '#33CD5F',
    routes: routes,
	on: {
		pageInit: function (page) {
			console.log(page.route);
		},
		popupOpen: function (popup) {
			console.log(popup);
		},
	},
});
*/
var mainView = MyApp.fw7.app.views.create('.view-main');

var panelLeft = MyApp.fw7.app.panel.create({
	el: '.panel-left'
})

var panelRight = MyApp.fw7.app.panel.create({
	el: '.panel-right',
	visibleBreakpoint: 797
});

$$("#globalsearch").on("blur", function(e) {
	let text = $$(this).val();
	if (text.length <= 0) {
		$$(".searchbar-disable-button").trigger("click");
	}
});

$$('body').on('taphold', function () {
	//alert('Tap hold fired!');
	MyApp.fw7.app.statusbar.show();
	alert("taphold detecté");
});

MyApp.fw7.app.on('taphold', function () {
	//alert('Tap hold fired!');
});


var searchbar = MyApp.fw7.app.searchbar.create({
	el: '.pos-searchbar',
	on: {
		enable: function () {
			console.log('Searchbar enabled')
		},
		disable: function () {
			console.log('Searchbar disabled')
		},
		search: function () {
			console.log('Searchbar disabled')
		},
		clear: function () {
			console.log('Searchbar disabled')
		}
	}
});


setTimeout(function() {
	searchbar.on("enable", function() {
		//console.log("Searchbar shown");
		$$(".payeur").hide();
	});

	searchbar.on("disable", function() {
		//console.log("Searchbar hidden");
		$$(".payeur").show();
	});
}, 500);



var Pay = function() {
	MyApp.fw7.app.views.main.router.navigate('/page1/');
};






