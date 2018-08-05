'use strict';

angular.module('postDiv').
  component('postDiv', {
  templateUrl:'post-div/post-div.template.html',
  controller: function PostController($http,$cookies) {
    var self=this;


    //---------------------------------------------------------------------------------------------
    self.text='null';
    //$http.get('posts/allposts.json').then(function(response){
    $http.get('http://localhost:3000/api/posts?sort={"id": -1}').then(function(response){
      self.posts=response.data;

    });

  }})
  .component('onepost', {
  templateUrl:'post-div/onepost.template.html',


  controller: function SubmitController($http,$route,$cookies) {
        var self=this;
        var time=new Date().getTime();

        self.text ='内容';
        // self.te="nnn";
        self.title='标题';
        self.imageurl='图片链接';
        self.alert="发帖";

        self.submit = function() {
          if (self.text!='内容') {
            // self.te = self.text;


//--------------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------




//-------------------------------------------------------------------
            var getCookie = $cookies.getObject("theCookie");
            $http.get("http://localhost:3000/api/users?where={'uid':"+getCookie+"}").then(function(response){
              // console.log(self.userinfo.data[0])

              self.userinfo=response.data.data[0];
              if (self.userinfo==undefined){
                self.userinfo={post_permission:0,comment_permission:0}
              }
              console.log(self.userinfo)
              if (self.userinfo['post_permission']>0){
                // self.alert="发送成功!"
                alert("发送成功!")
                var data={id:time,title:self.title,text:self.text,imageurl:self.imageurl};
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


                var data={uid:self.userinfo['uid'],post_permission:self.userinfo['post_permission']-1,comment_permission:self.userinfo['comment_permission']};
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
                        // $http.put('/propt/' + components._id, {someValue:components.someValue})
                console.log(self.userinfo)
                $http.put("http://localhost:3000/api/users/"+self.userinfo._id,data,config).then(function(msg){
                  console.log(msg);
                })

                $route.reload();


              }
              else{
                alert("发帖权限不足");
              }
            });

            // console.log(self.userinfo)
//-------------------------------------------------------------------

          }
        };
      }
    }
  );
