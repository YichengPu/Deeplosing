'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('postDetail').
  component('postDetail', {
    templateUrl: 'post-detail/post-detail.template.html',
    controller: ['$http','$routeParams',
      function PostDetailController($http,$routeParams) {
        var self=this;
        var post_id=$routeParams.postid;

        console.log("http://localhost:3000/api/posts?where={'id':"+$routeParams.postid+"}")
        $http.get("http://localhost:3000/api/posts?where={'id':"+$routeParams.postid+"}").then(function(response){
          self.post=response.data;
          console.log(self.post.data[0])
        });
        // console.log(self.post)

        $http.get("http://localhost:3000/api/comments?where={'postid':"+$routeParams.postid+"}").then(function(response){
          self.comments=response.data;
          // console.log(self.comments)
        });

        self.submit = function() {
          if (self.text!='null') {
            var time=new Date().getTime();
            var data= {id:time,postid:post_id,comment:self.text};
            var config = {
                        headers : {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        transformRequest: function(obj) {
                                     var str = [];
                                     for (var s in obj) {
                                       str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                                     }
                                     return str.join("&");
                     }
                    };
            $http.post('http://localhost:3000/api/comments',data,config).then(function(msg){
              console.log(msg);
            })
          }
        };
    // var self=this
        // this.id = $routeParams.postid;
        // $http.get('posts/'+$routeParams.postid+'.json').then(function(response){
        //   self.posts=response.data;
        // });
      }
    ]
  });
