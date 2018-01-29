(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Premade list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/data.template.html',
    controller: 'CategoriesController as categoriesList',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories()
        .then(function (response) {
          console.log("Retrieved data " + response.data);
          return response.data;
        })
        .catch(function (error) {
          console.log("Error in retrieving the Categories Data.");
        });
      }]
    }
  })

  .state('items', {
    url: '/items/{itemId}',
    templateUrl: 'src/menuapp/templates/items.template.html',
    controller: "ItemsController as itemsList",
    resolve: {
      items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.itemId)
        .then(function (response) {
          console.log("Retrieved data " + response.data);
          return response.data;
        })
        .catch(function (error) {
          console.log("Error in retrieving the Items Data. ");
        });
      }]
    }
  });

}

})();
