'use strict';

angular.module('postDiv').
  component('postDiv', {
  templateUrl:'post-div/post-div.template.html',
  controller: function PostController($http) {
    var self=this;
    //$http.get('posts/allposts.json').then(function(response){
    $http.get('http://localhost:3000/api/data').then(function(response){
      self.posts=response.data;
    });
    // var data={id:1,name:"good",size:1,description:"back",source:"front",shape:1,owner:"[cl]"};
    // transformRequest: function(obj) {
    //    var str = [];
    //    for(var p in obj)
    //    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    //    return str.join("&");
    // },
    // var data={"id":"1","name":"good","size":"1","description":"back","source":"front","shape":"1","owner":"[cl]"};
    // var data={id:1,name:"good",size:1,description:self.query,source:"front",shape:1,owner:"[cl]"};
    // var config = {
    //             headers : {
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             },
    //             transformRequest: function(obj) {
    //                          var str = [];
    //                          for (var s in obj) {
    //                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
    //                          }
    //                          return str.join("&");
    //          }
    //         };
    // $http.post('http://localhost:3000/api/data',data,config).then(function(msg){
    //   console.log(msg);
    // });
  }})
  .component('dDd', {
  templateUrl:'post-div/ddd.template.html',
  // controller: function DDDController($http) {
  //   var self=this;
  //
  //   var data={id:1,name:"good",size:1,description:self.query,source:"front",shape:1,owner:"[cl]"};
  //   var config = {
  //               headers : {
  //                   'Content-Type': 'application/x-www-form-urlencoded'
  //               },
  //               transformRequest: function(obj) {
  //                            var str = [];
  //                            for (var s in obj) {
  //                              str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
  //                            }
  //                            return str.join("&");
  //            }
  //           };
  //   $http.post('http://localhost:3000/api/data',data,config).then(function(msg){
  //     console.log(msg);
  //   })
  //
  // }

  controller: function SubmitController($http) {
        var self=this;
        self.text = 'null';
        self.te="nnn";
        self.submit = function() {
          if (self.text!='null') {
            self.te = self.text;


            var data={id:1,name:"good",size:1,description:self.text,source:"front",shape:1,owner:"[cl]"};
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
            $http.post('http://localhost:3000/api/data',data,config).then(function(msg){
              console.log(msg);
            })
          }
        };
      }
    }
  );
