var routes = [
    {
        path: "/",
        url: "./index.html",
    },
    {
        path: "/test/pos/",
        url: "./index.html",
    },
    {
        path: "/about/",
        url: "./pages/about.html",
    },
    {
        path: "/form/",
        url: "./pages/form.html",
    },
    {
        path: "/catalog/",
        componentUrl: "./pages/catalog.html",
    },
    {
        path: "/categories/",
        componentUrl: "./pages/categories.html",
    },
    {
        path: "/ticket/",
        componentUrl: "./pages/ticket.html",
    },
    {
        path: "/tickets/",
        componentUrl: "./pages/tickets.html",
    },
    {
        path: "/clients/",
        componentUrl: "./pages/clients.html",
    },
    {
        path: "/stats/",
        componentUrl: "./pages/stats.html",
    },
    {
        path: "/product/:id/",
        componentUrl: "./pages/product.html",
    },
    {
        path: "/client/",
        componentUrl: "./pages/client.html",
    },
    {
        path: "/client/:id/",
        componentUrl: "./pages/client.html",
    },
    {
        path: "/settings/",
        url: "./pages/settings.html",
    },
    {
        path: "/catalog/",
        url: "./pages/catalog.html",
    },
    {
        path: "/clients/",
        url: "./pages/clients.html",
    },
    {
        path: "/tickets/",
        url: "./pages/tickets.html",
    },
    {
        path: "/stats/",
        url: "./pages/stats.html",
    },
    {
        name: "home",
        path: "/home/",
        url: "./pages/home.html",
    },
    {
        name: "info",
        path: "/page1/",
        url: "./pages/page1.html",
        options: {
            animate: true,
            transition: "f7-parallax",
        },
    },
    {
        name: "facturation",
        path: "/page2/",
        url: "./pages/page2.html",
        options: {
            animate: true,
            transition: "f7-parallax",
        },
    },

    {
        path: "/dynamic-route/blog/:blogId/post/:postId/",
        componentUrl: "./pages/dynamic-route.html",
    },
    {
        path: "/request-and-load/user/:userId/",
        async: function (routeTo, routeFrom, resolve, reject) {
            // Router instance
            var router = this;

            // App instance
            var app = router.app;

            // Show Preloader
            app.preloader.show();

            // User ID from request
            var userId = routeTo.params.userId;

            // Simulate Ajax Request
            setTimeout(function () {
                // We got user data from request
                var user = {
                    firstName: "Vladimir",
                    lastName: "Kharlampidi",
                    about: "Hello, i am creator of Framework7! Hope you like it!",
                    links: [
                        {
                            title: "Framework7 Website",
                            url: "http://framework7.io",
                        },
                        {
                            title: "Framework7 Forum",
                            url: "http://forum.framework7.io",
                        },
                    ],
                };
                // Hide Preloader
                app.preloader.hide();

                // Resolve route to load page
                resolve(
                    {
                        componentUrl: "./pages/request-and-load.html",
                    },
                    {
                        context: {
                            user: user,
                        },
                    }
                );
            }, 1000);
        },
    },
    // Default route (404 page). MUST BE THE LAST
    {
        path: "(.*)",
        url: "./pages/404.html",
    },
];



/*
CACHE MANIFEST
# 2010-06-18:v3
# Explicitly cached entries
index.html
css/pos-app.css
css/icons.css

# offline.html will be displayed if the user is offline
#FALLBACK:
#/ /offline.html

# All other resources (e.g. sites) require the user to be online. 
NETWORK:
*

# Additional resources to cache
CACHE:
images/logo1.png
images/logo2.png
images/logo3.png
*/