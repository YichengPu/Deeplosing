'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('projectDetail').
  component('projectDetail', {
    templateUrl: 'project-detail/project-detail.template.html',
    controller: ['$http','$routeParams','$route','$cookies',
      function ProjectDetailController($http,$routeParams,$route,$cookies) {
        var self=this;
        var project_id=$routeParams.projectid;

        $http.get("http://localhost:3000/api/projects?where={'id':"+$routeParams.projectid+"}").then(function(response){
          self.project=response.data;
        });
        // console.log(self.post)

        $http.get("http://localhost:3000/api/comments?where={'postid':"+$routeParams.projectid+"}").then(function(response){
          self.comments=response.data;
          // console.log(self.comments)
        });

        self.submit = function() {
          if (self.text!='null') {

            var getCookie = $cookies.getObject("theCookie");

            var time=new Date().getTime();
            // time=Number(time)*19+10;
            var data= {id:time,uid:getCookie,postid:project_id,comment:self.text};
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
              // console.log(err.status);
              if (msg.status==201){
                alert("发送成功");
              }else{
                alert("发送失败,请检查发帖权限");
              }
            })

            $route.reload();


          }
        };

      }
    ]
  });
