var app = angular.module("portfolioApp", ["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider.when('/', { templateUrl : "partials/main.html" })
                  .when("/outpost", { templateUrl : "partials/outpost.html" })
                  .when("/sessionviewer", { templateUrl : "partials/sessionviewer.html" })
                  .otherwise({redirectTo : '/'});
});