(function(){
  'use strict';

angular.module('common')
.service('SignUpService',SignUpService);

function SignUpService() {

  var service = this;
  service.loggedIn= false;
  service.user = {};

  service.signup = function (user) { //set user and status
    service.user = user;
    service.loggedIn = true;
  };

  service.getStatus = function (){ //get status
    return service.loggedIn;
  }

  service.getUser = function (){ //get student
    return service.user;
  }

}
})();
