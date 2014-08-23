window.RegraDeTres.controller('CrossMultiplicationCtrl',
  ['$scope', 'AnalyticsService', CrossMultiplicationCtrl]);

function CrossMultiplicationCtrl($scope, AnalyticsService) {
  $scope.proportionType = 'direct';

  $scope.a = undefined;
  $scope.b = undefined;
  $scope.c = undefined;
  $scope.d = undefined;
  $scope.totalLines = 1;
  $scope.divisionByZero = false;

  $scope.initialize = function() {
    AnalyticsService.initialize();
  }

  $scope.dividend = function() {
    if($scope.proportionType == 'direct') {
      return $scope.c;
    } else {
      return $scope.a;
    }
  }

  $scope.divisor = function() {
    if($scope.proportionType == 'direct') {
      return $scope.a;
    } else {
      return $scope.c;
    }
  }

  $scope.calculateD = function() {
    if(![$scope.a, $scope.b, $scope.c].every($scope.isValidInput)) {
      $scope.d = '';
      return;
    }

    if($scope.parseNumber($scope.divisor()) == 0.0) {
      $scope.divisionByZero = true;
      $scope.d = ''
      return ;
    } else {
      $scope.divisionByZero = false;
    }

    var result = $scope.parseNumber($scope.b) *
      $scope.parseNumber($scope.dividend()) / $scope.parseNumber($scope.divisor());
    
    $scope.d = $scope.numberToString(result);
    $scope.totalLines = $scope.countLines(result)

    AnalyticsService.send('calculate', $scope.proportionType);
  };

  $scope.countLines = function(number) {
    var value = $scope.numberToString(number).replace(',', ''); 
    if(value.length > 11) {
      return 3;
    } else if(value.length > 6) {
      return 2;
    } else {
      return 1;
    }
  };

  $scope.isValidInput = function(value) {
    if(value === undefined)
      return false;

    return !isNaN($scope.parseNumber(value));
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

  $scope.keypress = function(event) {
    var validKeys = "-1234567890,"
    var key = event.key || String.fromCharCode(event.which);
    if (!event.which || event.metaKey || (validKeys.indexOf(key)) >= 0 || key.length > 1) {
      return;
    } else {
      event.preventDefault();
    }
  }

  $scope.$watch('a + b + c + proportionType', function(newVal, oldVal) {
    $scope.calculateD();
  });

  $scope.initialize();
}