(function(){
  'use strict';

  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var toBuyList = this;
    var empty = false;

    toBuyList.items = ShoppingListCheckOffService.getByItems();

    toBuyList.checkoff = function(itemIndex){
      ShoppingListCheckOffService.removeBuyItem(itemIndex);
    };

    toBuyList.empty = function (){
      if(empty === false){
        if (toBuyList.items.length < 1 ){
          empty = true;
        }
      }
      return empty;
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var boughtList = this;
    var start = true;

    boughtList.items = ShoppingListCheckOffService.getBoughtItems();

    boughtList.start = function (){
      if(start === true){
        if (boughtList.items.length >0){
          start = false;
        }
      }
      return start;
    };



  }

  function ShoppingListCheckOffService(){
    var checkOffService = this;

    //As a contructor I expect that this is run only the first time
    var tobuy_items = [
      {name:"rice",
      quantity:"2 kg"},
      {name:"tomato sauce",
      quantity:"2 l"},
      {name:"cheese",
      quantity:"200 g"},
      {name:"beans",
      quantity:"1 kg"},
      {name:"potatos",
      quantity:"1 kg"}
    ];

    var bought_items = [];

    checkOffService.getByItems = function (){
      return tobuy_items;
    };

    checkOffService.getBoughtItems = function (){
      return bought_items;
    };

    checkOffService.removeBuyItem = function (itemIndex){
      var item = {
        name: tobuy_items[itemIndex].name,
        quantity: tobuy_items[itemIndex].quantity
      };
      bought_items.push(item);
      tobuy_items.splice(itemIndex, 1);
    };

  }


})();
