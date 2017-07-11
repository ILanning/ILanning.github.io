var app = angular.module("portfolioApp", ["ngRoute", "ngAnimate"]);

app.config(function($routeProvider){
    $routeProvider.when('/', { templateUrl : "partials/main.html" })
                  .when("/games", { templateUrl : "partials/games.html" })
                  .when("/other", { templateUrl : "partials/other.html" })
                  .otherwise({redirectTo : '/'});
});

app.controller("mainController", function($scope, $routeParams, $location){
    if($location.path() == "/"){
        document.getElementById("topNavMainLink").focus();
    }
    var topNavButtons = document.getElementById("topNav").children;    
    var path = "#!" + $location.path();
    for(var i = 0; i < topNavButtons.length; i++){
        var link = topNavButtons[i].firstChild;
        if(link.getAttribute("href") == path){
            link.classList.add("activeTopNavButton");
        }else{
            link.classList.remove("activeTopNavButton");
        }
    }
});