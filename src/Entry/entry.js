angular.module('main')
  .controller('EntryCntrl', ['$scope', '$firebase', 'fbTop', function($scope, $firebase, fbTop){
    var addAnEntry = function(fillupId){
      var fbEntries = $firebase(fbTop.$inst().$ref().child('entries')).$asArray();
      $scope.subGroup.time = Date.now();
      $scope.subGroup.fillup = fillupId;
      fbEntries.$add($scope.subGroup);
      $scope.subGroup.location = null;
      $scope.subGroup.mpg = null;
      $scope.subGroup.mileage = null;
      $scope.subGroup.fillup = false;
    };
    $scope.addLog = function(){
      if($scope.subGroup.fillup){
        var fbFillups = $firebase(fbTop.$inst().$ref().child('fillups')).$asArray();
        fbFillups.$add($scope.fuelup).then(function(ref){
          addAnEntry(ref.key());
        });
      } else{
        addAnEntry(false);
      }
    };
    $scope.subGroup = {};
    $scope.subGroup.fillup = false;
    $scope.fuelup = {};
  }]);
