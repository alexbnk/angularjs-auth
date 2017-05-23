angular.module('publicApp', ['ui.router'])
    .controller('authCtrl', ['$scope','$state', function($scope, $state, $http) {

      $scope.b1= 'Register';
      $scope.b2= 'Log In';

      if ($state.current.name = 'welcome') {
        $scope.showButtons = true;
      } else {
        $scope.showButtons = false;
      }

    }])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {


        $urlRouterProvider.otherwise('/welcome');

         $locationProvider.html5Mode(true);
        $stateProvider
            .state('welcome', {
                url: '/welcome',
                templateUrl: 'welcome.html',
                controller: 'authCtrl'
            })
            .state('welcome.register', {
                url: '/register',
                templateUrl: 'register.html',
                controller: 'authCtrl'
            })
            .state('welcome.login', {
                url: '/login',
                templateUrl: 'login.html',
                controller: 'authCtrl'
            })
    });
