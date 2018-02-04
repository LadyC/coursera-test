(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService','SignUpService'];
function SignUpController(MenuService, SignUpService) {
  var signUpCtrl = this;
  signUpCtrl.completed = false;
  signUpCtrl.invalid=true;
  signUpCtrl.user = {};

  signUpCtrl.getStatus = function(){
    return signUpCtrl.completed;
  };

  signUpCtrl.phone = function(){
    if (signUpCtrl.user.phone == ""){
      return false;
    }else{
      return true;
    }
  };


  signUpCtrl.submit = function () {
    var promise = MenuService.getMenuItem(signUpCtrl.user.favoritedish);
    promise.then(function(response){
      console.log("SUBMIT then function ok.");
      signUpCtrl.user['menu_item'] = response.data;
      signUpCtrl.invalid=false;
      signUpCtrl.completed=true;
      signUpCtrl.id = SignUpService.signup(signUpCtrl.user);
    })
    .catch(function(){
      console.log("SUBMIT Something went wrong.");
      signUpCtrl.invalid=true;
      signUpCtrl.completed = false;
    });
  };

  signUpCtrl.validateFavorite = function(){
    var promise = MenuService.getMenuItem(signUpCtrl.user.favoritedish);
    promise.then(function(response){
      console.log("VALIDATE Favorite - then function ok.");
      signUpCtrl.invalid=false;
    })
    .catch(function(){
      console.log("VALIDATE Favorite - Something went wrong.");
      signUpCtrl.invalid=true;
    });
  };
}

})();
