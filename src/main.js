angular.module('main', ['firebase', 'ngRoute'])

  .value('fbURL', 'https://carlog-inferno.firebaseio.com/')

  .factory('firebaseData', function($firebase, fbURL){
    return $firebase(new Firebase(fbURL)).$asArray();
  })

  .controller('cntrl', ['$scope', 'firebaseData', function($scope, firebaseData){
    $scope.data = 'Here some data';
    $scope.fbData = firebaseData;
  }])
