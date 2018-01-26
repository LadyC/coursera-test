(function(){
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService',  MenuSearchService)
  .directive('foundItems', FoundItems)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  //directive
  function FoundItems(){
    var ddo = {
      templateUrl: 'itemList.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'found',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController(){
    var found = this;

    found.noResult = function (){
       if (found.items.length == 0){
         return true;
       }
       return false;
    };
  }

  //controller
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var list = this;

    list.searchTerm = "";
    list.found = [];

    list.showList = false;

    list.getItems = function (){
      list.showList = true;
      var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
      promise.then(function (response){
        list.found = response;
        }).catch(function (error){
          console.log("Controller - getItems: Error in retrieving data!");
        });
      };

    list.removeItem = function (itemIndex) {
      console.log("'this' is ", this);
      list.found.splice(itemIndex, 1);
      console.log("'item index' is ",itemIndex);

    };
  }

  //service
  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath){
    var service = this;

    service.getMatchedMenuItems = function (searchTerm){
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      })
      .then(function(result){
          var foundItems = [];
          if(searchTerm !== ""){
            for (var i = 0; i < result.data.menu_items.length; i++) {
              if (result.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1){
                foundItems.push({short_name: result.data.menu_items[i].short_name, description: result.data.menu_items[i].description});
              }
            }
          }
          return foundItems;
        });
      };
  };

})();
