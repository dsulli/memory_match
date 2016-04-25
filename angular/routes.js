var app = angular.module("routeApp", ["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
        .when('/how2play', {
            templateUrl: 'info/how2play.html'
        })
        .when('/items', {
            templateUrl: 'info/items.html'
        })
        .when('/about', {
            templateUrl: 'info/about.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});