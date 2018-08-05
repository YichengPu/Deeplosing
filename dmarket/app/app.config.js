'use strict';

angular.
  module('marketapp').
  config(['$locationProvider','$routeProvider',"$cookiesProvider",
  function config($locationProvider,$routeProvider,$cookiesProvider){
    $locationProvider.hashPrefix('!');
    $cookiesProvider.defaults = {
          path:'/',
          domain:'localhost:8000',
          expires:(new Date().getTime()+5000),
          secure:true
          };
    $routeProvider.
      when('/info',{
          template:'<info-page></info-page>'
      }).
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
    otherwise('/info');
  }

]);
