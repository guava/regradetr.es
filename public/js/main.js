function CrossMultiplicationCtrl($scope) {
  $scope.proportionType = 'direct';

  $scope.a = undefined;
  $scope.b = undefined;
  $scope.c = undefined;
  $scope.d = undefined;

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
    var strValue = number + '';

    return strValue.replace('.', ',').substr(0, 6);
  }

  $scope.changeProportionType = function(type) {
    $scope.proportionType = type;
  }

  $scope.$watch('a + b + c + proportionType', function(newVal, oldVal) {
    $scope.calculateD();
  })
}
