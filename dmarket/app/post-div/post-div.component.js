'use strict';

angular.module('postDiv').
  component('postDiv', {
  templateUrl:'post-div/post-div.template.html',
  controller: function PostController($http) {
    var self=this;
    self.text='null';
    //$http.get('posts/allposts.json').then(function(response){
    $http.get('http://localhost:3000/api/posts').then(function(response){
      self.posts=response.data;

    });

  }})
  .component('onepost', {
  templateUrl:'post-div/onepost.template.html',


  controller: function SubmitController($http) {
        var self=this;
        var time=new Date().getTime();

        self.text = 'null';
        self.te="nnn";
        self.submit = function() {
          if (self.text!='null') {
            self.te = self.text;


            var data={id:time,text:self.text};
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
            $http.post('http://localhost:3000/api/posts',data,config).then(function(msg){
              console.log(msg);
            })
          }
        };
      }
    }
  );
