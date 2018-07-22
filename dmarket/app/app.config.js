'use strict';

angular.
  module('marketapp').
  config(['$locationProvider','$routeProvider',
  function config($locationProvider,$routeProvider){
    $locationProvider.hashPrefix('!');
    $routeProvider.
      when('/index',{
          template:'<index-page></index-page>'
      }
      ).
      when('/posts',{
        template:'<onepost></onepost>  <post-div></post-div>'
      }
    ).
    when('/posts/:postid',{
      template:'<post-detail><post-detail>'
    }
    ).
    otherwise('/index');
  }

]);
