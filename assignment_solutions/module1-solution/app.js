(function(){
  'use strict';

  angular.module('LunchApp', [])
  .controller('LunchController', LunchController);

  LunchController.$inject = ['$scope'];
  function LunchController($scope){
    var message = "";

    $scope.displayMessage = function(){
      return message;
    };

    $scope.checkLunch = function () {

      var input = $scope.menu;
      input = input.replace(/\s/g, '');
      var elements =  input.split(',');
      var number_elements = real_number_elements (elements);
      if (number_elements <= 3 ){
        if ((number_elements == 0)||((number_elements == 1)&&(elements == ""))){
          message = "Please enter data first.";
        }else{
          message = "Enjoy! :) ";
        }
      } else{
        message = "Too Much!";
      }
    };

    function real_number_elements (elements){
      debugger;
      if (elements.length == 1){
        return 1;
      }

      var count = 0;
      for (var i = 0; i < elements.length; i ++){
        //if it's not an empty element, it counts it.
        if (!((typeof elements[i] == 'undefined')||(elements[i] == ""))){
          count += 1;
        }
      }
      return count;
    }

  }
})();
