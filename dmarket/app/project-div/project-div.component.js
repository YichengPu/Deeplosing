'use strict';

angular.module('projectDiv').
  component('projectDiv', {
  templateUrl:'project-div/project-div.template.html',
  controller: function ProjectController($http,$cookies,$routeParams,$route) {
    var self=this;
    var page_number=Number($routeParams.pagenumber);
    var project_per_page=12;

    //---------------------------------------------------------------------------------------------
    self.text='null';
    $http.get("http://localhost:3000/api/projects?sort={'id':-1}&skip="+project_per_page*(page_number-1)+"&limit="+project_per_page).then(function(response){
      self.projects=response.data;
    });
    var page_count=1;
    self.current_page=page_number;

    self.pages=[];
    $http.get("http://localhost:3000/api/projects?count=true").then(function(response){

      page_count=Math.floor(response.data.data/project_per_page)+1;
      self.last_page=page_count;
      console.log(page_count);
      var i;
      var start_page=1;
      var end_page=page_count;

      if (page_number-start_page>5){
        start_page=page_number-5;
      }

      if (end_page-page_number>5){
        end_page=page_number+5;
      }
      console.log(start_page,end_page);
      for (i=start_page;i<(end_page+1);i++){
        self.pages.push(i);
      }



    });
    // self.pages=[1,2,3,4,5];
  }})
  .component('oneproject', {
  templateUrl:'project-div/oneproject.template.html',


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

//-------------------------------------------------------------------
          var getCookie = $cookies.getObject("theCookie");

              // self.alert="发送成功!"

          var data={id:time,uid:getCookie,title:self.title,text:self.text,imageurl:self.imageurl};
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
          $http.post('http://localhost:3000/api/projects',data,config).then(function(msg){
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

            // console.log(self.userinfo)
//-------------------------------------------------------------------

          }
        }
      }

  );
