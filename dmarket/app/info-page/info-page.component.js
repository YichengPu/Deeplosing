'use strict';

angular.
  module('infoPage').
  component('infoPage', {
  // template:'<p>!!!</p>',
  templateUrl:'info-page/info-page.template.html',
  controller: function PostController($http,$cookies) {
    var self=this;
    var getCookie = $cookies.getObject("theCookie");
    if (getCookie==undefined){
      var key_1=Math.floor(Math.random() * 1000);
      var key_2=Math.floor(Math.random() * 1000);
      var key_3=Math.floor(Math.random() * 100000);
      var time=new Date().getTime();
      var key=Math.floor((time/key_1+7)*key_2/3)+key_3;
      alert(key);
      $cookies.putObject("theCookie",key,{expires:"Thu, 01 Oct 2018 00:00:00 GMT"});
      var data={uid:key,post_permission:5,comment_permission:30};
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
      $http.post('http://localhost:3000/api/users',data,config).then(function(msg){
        console.log(msg);
      })

    }
    else{
      console.log(getCookie)
      self.userinfo={post_permission:0,comment_permission:10};
      $http.get("http://localhost:3000/api/users?where={'uid':"+getCookie+"}").then(function(response){

        self.userinfo=response.data.data[0];

      });

      if (self.userinfo==undefined){
        self.userinfo={post_permission:0,comment_permission:0}
      }

    }

    }
  }
);
