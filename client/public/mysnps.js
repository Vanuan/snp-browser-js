angular.module('mysnps', ['ngResource']).
factory('MySnps', function($resource) {
  var MySnps = $resource('/mysnps/:ids', {}, {});
  return MySnps;
});

