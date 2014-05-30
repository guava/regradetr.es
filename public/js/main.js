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
  var controlKeys = [8, 9, 13, 35, 36, 37, 39,44,110,190];
  var isControlKey = controlKeys.join(",").match(new RegExp(event.which));

  if (!event.which || // Control keys in most browsers. e.g. Firefox tab is 0
      event.metaKey ||
      (48 <= event.which && event.which <= 57) || // Always 0 through 9
      (96 <= event.which && event.which <= 106) || // Always 0 through 9 from number section
      isControlKey) { // Opera assigns values for control keys.
    return;
  } else {
    event.preventDefault();
  }
});
