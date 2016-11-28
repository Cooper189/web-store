var app = angular.module('app', []);
app.filter('startFrom', function(){
  return function(input, start){
    console.log(start);
    start = +start;
    return input.slice(start);
  }
})
app.directive('scc', function () {
  return {
    scope: {},
      templateUrl: null,
      restrict: 'E',
      controllerAs: "scc",
      bindToController: true,
    controller: function (goodsService, $timeout) {
      var self = this
      self.currentPage = 0;
      self.itemsPerPage = 5;
      // self.dodo = self.items.length;
      self.items = [];
       var goodsPromise = goodsService.getGoods();
      goodsPromise.then(function (val) {self.items = val;});
       // self.dodo = self.items.length;  
      self.firstPage = function() {
    return self.currentPage == 0;
  }
  self.lastPage = function() {
    var lastPageNum = Math.ceil(self.node.length / self.itemsPerPage - 1);console.log(self.node.length);
    return self.currentPage == lastPageNum;
  }
  self.numberOfPages = function(){
    return Math.ceil(self.node.length / self.itemsPerPage);
  }
  self.startingItem = function() {
    
    return self.currentPage * self.itemsPerPage;

  }
  self.pageBack = function() {
    self.currentPage = self.currentPage - 1;
    console.log(self.currentPage);
  }
  self.pageForward = function() {

    self.currentPage = self.currentPage + 1;
console.log(self.currentPage);
}
  self.motaro = function (x, y) {
    self.gog = y;
    self.gogo = x;
    self.currentPage = 0;
  }
    },
    /*link: function (scope) {
          scope.firstPage = function() {
    return scope.currentPage == 0;
  }
  scope.lastPage = function() {
    console.log(scope.items);
    var lastPageNum = Math.ceil(scope.items.length / scope.itemsPerPage - 1);
    return $scope.currentPage == lastPageNum;
  }
  scope.numberOfPages = function(){
    console.log(scope.items);
    return Math.ceil(scope.items.length / scope.itemsPerPage);
  }
  scope.startingItem = function() {
    console.log(scope.items);
    return scope.currentPage * scope.itemsPerPage;
  }
  scope.pageBack = function() {
    console.log(scope.items);
    scope.currentPage = scope.currentPage - 1;
  }
  scope.pageForward = function() {
    console.log(scope.items);
    scope.currentPage = scope.currentPage + 1;

}
    }*/
  };
})
/*.controller('paginationCtrl', function($scope, goodsService){
  $scope.currentPage = 0;
  $scope.itemsPerPage = 5;
  var goodsPromise = goodsService.getGoods();
      goodsPromise.then(function (val) {$scope.items = val; console.log(val)});

  for(var i=0; i<25; i++){
    $scope.items.push('Product ' + i);
  }

  $scope.firstPage = function() {
    return $scope.currentPage == 0;
  }
  $scope.lastPage = function() {
    var lastPageNum = Math.ceil($scope.items.length / $scope.itemsPerPage - 1);
    return $scope.currentPage == lastPageNum;
  }
  $scope.numberOfPages = function(){
    return Math.ceil($scope.items.length / $scope.itemsPerPage);
  }
  $scope.startingItem = function() {
    return $scope.currentPage * $scope.itemsPerPage;
  }
  $scope.pageBack = function() {
    $scope.currentPage = $scope.currentPage - 1;
  }
  $scope.pageForward = function() {
    $scope.currentPage = $scope.currentPage + 1;

}
});*/
app.factory('goodsService', ['$http','$q', function ($http, $q) {
  return {
    getGoods: function () {
      var d = $q.defer();
      $http({method: 'POST', url: 'items.json'}).success(function (data, status, headers, config) {
        d.resolve(data.slides);
      }).error(function() {
        d.reject(status)
      });
      return d.promise;   
    }
  };
}])