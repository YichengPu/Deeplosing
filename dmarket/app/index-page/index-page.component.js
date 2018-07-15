'use strict';

angular.
  module('indexPage').
  component('indexPage', {
  // template:'<p>!!!</p>',
  templateUrl:'index-page/index-page.template.html',
  controller: function PostController($http) {
    var self=this;
    $http.get('posts/allposts.json').then(function(response){
      self.posts=response.data;
    });
    }
  }
);
