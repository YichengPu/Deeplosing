'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('postDetail').
  component('postDetail', {
    templateUrl: 'post-detail/post-detail.template.html',
    controller: ['$http','$routeParams',
      function PostDetailController($http,$routeParams) {
        var self=this
        this.id = $routeParams.postid;
        $http.get('posts/'+$routeParams.postid+'.json').then(function(response){
          self.posts=response.data;
        });
      }
    ]
  });
