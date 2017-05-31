var app = angular.module('app', ['ngRoute', 'ngCookies'])

app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'partials/index.html',
        controller: 'UsersController as UC'
    })
    .when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'UsersController as UC'
    })
    .when('/create', {
        templateUrl: 'partials/create.html',
        controller: 'UsersController as UC'
    })
    .when('/poll/:id', {
        templateUrl: 'partials/poll.html',
        controller: 'UsersController as UC'
    })
    .otherwise({ redirectTo: '/' });
})
