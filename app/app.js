angular.module('publicApp')

    .controller('testCtrl', function($rootScope,$scope,$http, testFactory) {
        $scope.someText = "hello test";

        testFactory.getUsers().then(function(users) {
            $scope.users = users;
        })

        $scope.logout = function(){
        delete $http.defaults.headers.common.Authorization;
        localStorage.removeItem("user");

      }
      testFactory.getPhoto($rootScope.oid).then(function(photo) {
          $scope.userProfilePhoto = photo;
      })



    })

    .factory('testFactory', function($http) {
        var thisFactory = {};

        var user = JSON.parse(localStorage.getItem("user"));


        //set the header for all requests
        //$http.defaults.headers.common.Authorization = 'Bearer ' + user.token;


        thisFactory.getUsers = function() {

            return $http.get('/api/users')
                .then(function(response) {
                    // console.log(response.data);
                    //play with data
                    //console.log(response.data);
                    return response.data;

                }, function(err) {
                    //console.error(err);
                });


        };

        thisFactory.getPhoto = function(facebookId) {

            return $http.get('http://graph.facebook.com/'+facebookId+'/picture')
                .then(function(response) {
                    // console.log(response.data);
                    //play with data
                    //console.log(response.data);
                    return response.data;

                }, function(err) {
                    //console.error(err);
                });


        };











        return thisFactory;

    })
