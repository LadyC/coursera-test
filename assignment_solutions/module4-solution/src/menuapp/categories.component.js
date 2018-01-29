(function () {
'use strict';

angular.module('data')
.component('categories', {
  templateUrl: 'src/menuapp/templates/category.template.html',
  bindings: {
    categories: '<'
  }
});

})();
