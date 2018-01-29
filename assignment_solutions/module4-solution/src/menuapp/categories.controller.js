(function () {
'use strict';

angular.module('data')
.controller('CategoriesController', CategoriesController);

CategoriesController.$inject = ['MenuDataService', 'categories'];
function CategoriesController(MenuDataService, categories) {
  var categoriesList = this;
  categoriesList.categories = categories;
}

})();
