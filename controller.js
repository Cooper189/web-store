var app = angular.module('app', ['ngRoute']);
app.config(['$routeProvider',function ($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'template/main.html'
  });
  $routeProvider.otherwise({ redirectTo: '/main' });
}])


app.filter('startFrom', function(){
  return function(input, start){
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
      var self = this;
      self.currentPage = 0;
      self.itemsPerPage = 10;
      self.items = [];
       var goodsPromise = goodsService.getGoods();
      goodsPromise.then(function (val) {self.items = val;});
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
  }
  self.pageForward = function() {

    self.currentPage = self.currentPage + 1;
}
  self.motaro = function (x, y) {
    self.gog = y;
    self.gogo = x;
    self.currentPage = 0;
    }
  },
  };
})

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