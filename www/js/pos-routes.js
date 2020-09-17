var routes = [
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
];