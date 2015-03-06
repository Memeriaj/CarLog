angular.module('main')
  .controller('LogsCtrl', ['$scope', '$firebase', 'fbTop', function($scope, $firebase, fbTop){
    $scope.data = 'Here some data';
    $scope.fbEntries = $firebase(fbTop.$inst().$ref().child('entries')).$asArray();
    // console.log($scope.fbEntries);
    $scope.getDate = function(time){
      var entry_time = moment(time);
      return entry_time.format("MMM DD, YY @ HH:mm");
      // return entry_time.calendar();
    };
  }]);
