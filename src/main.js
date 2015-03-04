angular.module('main', ['firebase', 'ngRoute'])

  .value('fbURL', 'https://carlog-inferno.firebaseio.com/')

  .factory('fbTop', function($firebase, fbURL){
    return $firebase(new Firebase(fbURL)).$asObject();
  })

  .controller('MainCntrl', ['$scope', 'fbTop', function($scope, fbTop){
    $scope.data = 'Here some data';
    $scope.fbData = fbTop;


  }])

  .controller('EntryCntrl', ['$scope', '$firebase', 'fbTop', function($scope, $firebase, fbTop){
    $scope.addLog = function(){
      var fbEntries = $firebase(fbTop.$ref().child('entries')).$asArray();
      $scope.subGroup.time = Date.now();
      var addedRef = fbEntries.$add($scope.subGroup);
      $scope.subGroup.submitted = 'Traveled to '+$scope.subGroup.loc+
        ' ending at mile '+$scope.subGroup.mile+' at an average MPG of '+
        $scope.subGroup.mpg+'.';
      $scope.subGroup.location = null;
      $scope.subGroup.mpg = null;
      $scope.subGroup.mileage = null;
    };
    $scope.subGroup = {};
    $scope.subGroup.fillup = false;
    $scope.fuelup = {};
    $scope.subGroup.submitted = 'Nothing submitted';
  }]);
