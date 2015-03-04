angular.module('main', ['firebase', 'ngRoute'])

  .value('fbURL', 'https://carlog-inferno.firebaseio.com/')

  .factory('fbTop', function($firebase, fbURL){
    return $firebase(new Firebase(fbURL)).$asObject();
  })

  .controller('MainCntrl', ['$scope', 'fbTop', function($scope, fbTop){
    $scope.data = 'Here some data';
    $scope.fbData = fbTop;
  }])

  .config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/entry', {
        controller:'EntryCntrl',
        templateUrl:'entry.html'
      })
      .otherwise({
        redirectTo:'/entry'
      });
  }]);
