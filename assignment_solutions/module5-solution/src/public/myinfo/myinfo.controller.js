(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['SignUpService','userInfo'];
function MyInfoController(SignUpService, userInfo) {
  var myInfoCtrl = this;

  myInfoCtrl.user = userInfo;
  myInfoCtrl.status = SignUpService.getStatus();

   myInfoCtrl.phone = function(){
     if  (myInfoCtrl.user.phone == ""){
       return false;
     } else {
       return true;
     }
   }
}

})();
