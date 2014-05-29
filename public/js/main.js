function CrossMultiplicationCtrl($scope) {
  $scope.proportionType = 'direct';

  $scope.a = undefined;
  $scope.b = undefined;
  $scope.c = undefined;
  $scope.d = undefined;
  $scope.totalLines = 1;

  $scope.calculateD = function() {
    if(!$scope.checkValidity($scope.a))
      return '';
    if(!$scope.checkValidity($scope.b))
      return '';
    if(!$scope.checkValidity($scope.c))
      return '';

    var d = undefined;

    if($scope.proportionType == 'direct') {
      d = ($scope.parseNumber($scope.c) * $scope.parseNumber($scope.b)) / $scope.parseNumber($scope.a);
    } else {
      d = ($scope.parseNumber($scope.a) * $scope.parseNumber($scope.c)) / $scope.parseNumber($scope.b);
    }
    $scope.d = $scope.numberToString(d);
    var value = $scope.numberToString(d).replace(',', '');
    if(value.length > 12) {
      $scope.totalLines = 3;
    } else if(value.length > 6) {
      $scope.totalLines = 2;
    } else {
      $scope.totalLines = 1;
    }
  };

  $scope.checkValidity = function(value) {
    if(value === undefined)
      return false;

    return $scope.parseNumber(value);
  };

  $scope.parseNumber = function(value) {
    var value = value.replace(',', '.');

    return parseFloat(value);
  }

  $scope.numberToString = function(number) {
    var strValue = number.toFixed(2);
    var pointPosition = strValue.indexOf('.');
    if(strValue.substring(pointPosition + 1) == '00') {
      strValue = strValue.substring(0, pointPosition);
    }

    return strValue.replace('.', ',');
  }

  $scope.changeProportionType = function(type) {
    $scope.proportionType = type;
  }

  $scope.$watch('a + b + c + proportionType', function(newVal, oldVal) {
    $scope.calculateD();
  })
}
