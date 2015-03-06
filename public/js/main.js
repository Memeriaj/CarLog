angular.module('main', ['firebase', 'ngRoute'])

  .value('fbURL', 'https://carlog-inferno.firebaseio.com/')

  .constant('navOptions',
    [
      {name: 'Entry', link: '/entry', routeNav:
        {controller: 'EntryCtrl', templateUrl:'entry.html'}},
      {name: 'Logs', link: '/logs', routeNav:
        {controller: 'LogsCtrl', templateUrl:'logs.html'}}
    ])

  .factory('fbTop', ['$firebase', 'fbURL', function($firebase, fbURL){
    return $firebase(new Firebase(fbURL)).$asObject();
  }])

  .controller('MainCtrl', ['$scope', 'fbTop', function($scope, fbTop){
    $scope.data = 'Here some data';
    $scope.fbData = fbTop;
  }])

  .controller('NavCtrl', ['$scope', '$location', 'navOptions', function($scope, $location, navOptions){
    $scope.options = navOptions;
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  }])

  .config(['$routeProvider', 'navOptions', function($routeProvider, navOptions){
    navOptions.forEach(function(element, index, array){
      $routeProvider.when(element.link, element.routeNav);
    });
    $routeProvider.otherwise({redirectTo:'/entry'});
  }]);
