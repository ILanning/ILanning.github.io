var app = angular.module("portfolioApp", ["ngRoute", "ngAnimate"]);

app.config(function($routeProvider){
    $routeProvider.when('/', { templateUrl : "partials/main.html" })
                  .when("/outpost", { templateUrl : "partials/outpost.html" })
                  .when("/sessionviewer", { templateUrl : "partials/sessionviewer.html" })
                  .when("/other", { templateUrl : "partials/other.html" })
                  .otherwise({redirectTo : '/'});
});

app.controller("mainController", function($scope, $routeParams, $location){
    if($location.path() == "/"){
        console.log("Main hit");
        document.getElementById("topNavMainLink").focus();
    }
});