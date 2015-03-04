angular.module('main')
  .controller('LogsCntrl', ['$scope', '$firebase', 'fbTop', function($scope, $firebase, fbTop){
    $scope.data = 'Here some data';
    $scope.fbEntries = $firebase(fbTop.$inst().$ref().child('entries')).$asArray();
    console.log($scope.fbEntries);
    $scope.getDate = function(time){
      var d = new Date(time);
      return d.toGMTString();
    };
  }]);
