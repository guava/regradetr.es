function CrossMultiplicationCtrl($scope) {
  $scope.proportionType = 'direct';

  $scope.a = undefined;
  $scope.b = undefined;
  $scope.c = undefined;
  $scope.d = undefined;
  $scope.totalLines = 1;

  $scope.calculateD = function() {
    if(!$scope.checkValidity($scope.a)) {
      $scope.d = '';
      return;
    }
    if(!$scope.checkValidity($scope.b)) {
      $scope.d = '';
      return;
    }
    if(!$scope.checkValidity($scope.c)) {
      $scope.d = '';
      return;
    }

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

$('.input-1, .input-2, .input-3').on('keypress', function(event) {
  var validKeys = "-1234567890,"

  if (!event.which || event.metaKey || (validKeys.indexOf(event.key)) >= 0) {
    return;
  } else {
    event.preventDefault();
  }
});
