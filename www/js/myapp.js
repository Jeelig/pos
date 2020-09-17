var $$ = Dom7;

var app = new Framework7({
    root: "#app", // App root element
    name: "My App", // App Name
    id: "com.myapp.test", // App id
	theme: 'md', // Automatic theme detection : auto, ios or android
    panel: { // Enable swipe panel
        swipe: false,
		resizable: false
    },
	themeColor: '#33CD5F',
    // Add default routes
	//routes: routes,
	/*
		f7-circle
		f7-cover
		f7-cover-v
		f7-dive
		f7-fade
		f7-flip
		f7-parallax
		f7-push
	*/
    routes: [
        {
			path: '/',
			url: "./index.html"
        },
        {
			path: '/test/pos/',
			url: "./index.html"
        },
        {
			name: 'home',
            path: "/home/",
			url: './pages/home.html'
        },
        {
			name: 'info',
            path: "/page1/",
            url: "./pages/page1.html",
			options: {
				animate: true,
				transition: 'f7-parallax',
			}
        },
        {
			name: 'facturation',
            path: "/page2/",
            url: "./pages/page2.html",
			options: {
				animate: true,
				transition: 'f7-parallax',
			}
        },
		{
			path: '(.*)',
			url: './pages/404.html',
			//url: './pages/home.html'
		},
    ],
    // ... other parameters
	on: {
		// each object key means same name event handler
		pageInit: function (page) {
			// do something on page init
			console.log(page.route);
		},
		popupOpen: function (popup) {
			// do something on popup open
			console.log(popup);
		},
	},
});

var mainView = app.views.create('.view-main');

function toto() {
	console.log("popup");
	app.popup.open(".popup-about", true);
}

//console.log("okiaa");

var panelLeft = app.panel.create({
	el: '.panel-left',
	resizable: true,
	//visibleBreakpoint: 1024,
	//collapsedBreakpoint: 768,
})

var panelRight = app.panel.create({
	el: '.panel-right',
	resizable: true,
	visibleBreakpoint: 797
});

$$("#globalsearch").on("blur", function(e) {
	let text = $$(this).val();
	if (text.length <= 0) {
		$$(".searchbar-disable-button").trigger("click");
	}
});


var searchbar = app.searchbar.create({
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


searchbar.on("enable", function() {
	//console.log("Searchbar shown");
	$$(".payeur").hide();
});

searchbar.on("disable", function() {
	//console.log("Searchbar hidden");
	$$(".payeur").show();
});


