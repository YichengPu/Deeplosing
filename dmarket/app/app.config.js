'use strict';

angular.
  module('marketapp').
  config(['$locationProvider','$routeProvider',
  function config($locationProvider,$routeProvider){
    $locationProvider.hashPrefix('!');
    $routeProvider.
      when('/index',{
          template:'<post-div></post-div> <onepost></onepost>  '
      }
      ).
    //   when('/posts',{
    //     template:'<onepost></onepost>  <post-div></post-div>'
    //   }
    // ).
    when('/posts/:postid',{
      template:'<post-detail></post-detail>'
    }
    ).
    otherwise('/index');
  }

]);
