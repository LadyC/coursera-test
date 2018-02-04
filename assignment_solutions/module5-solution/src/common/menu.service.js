(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  service.error_data=false;

  service.getTransaction_state = function(){
    return service.error_data;
  }

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }
    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function (short_name) {
    if (typeof short_name !== "undefined") {
        var response = $http({
          method: "GET",
          url: (ApiPath + '/menu_items/'+ short_name +'.json')
        });
        return response;
    }else{
      console.log("short_name -> type undefined");
    }
  };

}



})();
