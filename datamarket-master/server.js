// Get the packages we need
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    secrets = require('./config/secrets'),
    bodyParser = require('body-parser'),
    Data = require('./models/data'),
    Trans = require('./models/trans'),
    User = require('./models/user'),
    Posts = require('./models/posts'),
    Projects=require('./models/projects'),
    Comments = require('./models/comments')

// Create our Express application
var app = express();

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Connect to a MongoDB
var db = mongoose.connect(secrets.mongo_connection, { useMongoClient: true});

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', router)
app.use(bodyParser.json());
app.use(function(req, res, next){
   req.db = db;
   next();
});

// get all users
var usersRoute = router.route('/users')
usersRoute.get(function(req, res,err){
    var sort = eval("("+req.query.sort+")");
    var where = eval("("+req.query.where+")");
    var select = eval("("+req.query.select+")");
    var skip = eval("("+req.query.skip+")");
    var limit = eval("("+req.query.limit+")");
    var count = eval("("+req.query.count+")");

    if (err) {
        User.find(where, function(err, users) {
            if (err) {
                return res.status(500).send({'message': "fail to get user", data: []});
            } else {
                return res.status(200).send({'message': 'got user', data: users});
            }
        }).limit(limit).skip(skip).sort(sort);
    }
});

// add a user
usersRoute.post(function(req, res) {
    User.create(req.body, function(err, user) {
        if (err) {
           return res.status(500).send({'message': "fail to save to server", data: []});
        } else {
           return res.status(201).send({'message': "new user created", data: user});
        }
    })
});

// get a user detail
var userDetailRoute = router.route('/users/:id')
userDetailRoute.get(function (req, res){
    var id = req.params.id;
    User.findOne({'uid': id}, function(err, user) {
        if (err || user === null)
            return res.status(404).send({'message': "user not found.", data: []});
        else
            return res.status(200).send({'message': "ok", data: user})
    })
})


// update a user detail
// userDetailRoute.put(function(req, res) {
//     var id = req.params.id;
//
//     User.findByIdAndUpdate(id, req.body, {new: true}, function(err, user){
//         if (err)
//             return res.status(500).send({'message': "fail to update", data: []});
//         else
//             return res.status(200).send({'message': "user updated", data: user});;
//     });
// });
//
// // get data
// var dataRoute = router.route('/data')
// dataRoute.get(function(req, res) {
//     var sort = eval("("+req.query.sort+")");
//     var where = eval("("+req.query.where+")");
//     var select = eval("("+req.query.select+")");
//     var skip = eval("("+req.query.skip+")");
//     var limit = eval("("+req.query.limit+")");
//     var count = eval("("+req.query.count+")");
//
//     if (count === true) {
//         Data.count(where, function(err, data) {
//             if (err) {
//                 return res.status(500).send({'message': "Fail to get data", data: []});
//             } else {
//                 return res.status(200).send({'message': "Got counts(data)", data: data});
//             }
//         }).limit(limit).skip(skip).sort(sort);
//     } else {
//         Data.find(where, function(err, data) {
//             if (err) {
//                return res.status(500).send({'message': "fail to get data", data: []});
//             } else {
//                return res.status(200).send({'message': "got data", data: data});
//             }
//         }).limit(limit).skip(skip).sort(sort);
//     }
// });
//
// // add a dataset
// dataRoute.post(function(req, res) {
//     Data.create(req.body, function(err, data) {
//         if (err){
//             throw(err);
//             return res.status(500).send({'message': "fail to save data", data: []});
//         }else {
//             return res.status(201).send({'message': "new dataset created", data: data});
//           }
//     })
// })
//
// var dataDetailRoute = router.route('/data/:id')
//
// // get dataset detail
// dataDetailRoute.get(function(req, res) {
//     var id = req.params.id;
//     Data.findOne({'_id': id}, function(err, data) {
//         if (err || data === null)
//             return res.status(404).send({'message': "data not found", data: []});
//
// })
// })
//
// // update a dataset
// dataDetailRoute.put(function(req, res) {
//     var id = req.params.id;
//     Data.findByIdAndUpdate(id, req.body, {new: true}, function(err, data) {
//         if (err)
//             return res.status(500).send({'message': "fail to update data", data: []});
//         else
//             return res.status(200).send({'message': "data updated", data: data})
//
//     });
// })
//
// var transRoute = router.route('/trans')
//
// // get all trans
// transRoute.get(function(req, res) {
//     var sort = eval("("+req.query.sort+")");
//     var where = eval("("+req.query.where+")");
//     var select = eval("("+req.query.select+")");
//     var skip = eval("("+req.query.skip+")");
//     var limit = eval("("+req.query.limit+")");
//     var count = eval("("+req.query.count+")");
//
//     if (count == true) {
//         Trans.count(where, function(err, trans) {
//             if (err) {
//                 return res.status(500).send({'message': "fail to get trans", data: []})
//             } else {
//                 return res.status(200).send({'message': "got counts(trans)", data: trans})
//             }
//         }).limit(limit).skip(skip).sort(sort);
//     } else {
//         Trans.find(where, function(err, trans) {
//             if (err) {
//                 return res.status(500).send({'message': "fail to get trans", data: []});
//             } else {
//                 return res.status(200).send({'message': "got trans", data: trans});
//             }
//         }).limit(limit).skip(skip).sort(sort);
//     }
// })
//
// // add a trans
// transRoute.post(function(req, res) {
//     Trans.create(req.body, function(err, trans) {
//         if (err)
//             return res.status(500).send({'message': "fail to save to server", data: []});
//         else
//             return res.status(201).send({'message': "new trans created", data: trans});
//     })
// })
//
// var transDetailRoute = router.route('/trans/:id')
// // get a trans
// transDetailRoute.get(function(req, res) {
//     var id = req.params.id;
//     Trans.findOne({'_id': id}, function(err, trans) {
//         if (err || trans === null)
//            return res.status(404).send({'message': "fail to get the trans", data: []});
//         else
//            return res.status(200).send({'message': "ok", data: trans});
//     })
// })
//
// // update a trans
// transDetailRoute.put(function(req, res) {
//     var id = req.params.id;
//     Trans.findByIdAndUpdate(id, req.bodya, {new: true}, function(err, tran) {
//          if (err)
//              return res.status(500).send({'message': "fail to update", data: []});
//          else
//              return res.status(200).send({'message': "tran updated", data: tran});
//     })
// })


var postRoute = router.route('/posts')

// get all posts
postRoute.get(function(req, res) {
    var sort = eval("("+req.query.sort+")");
    var where = eval("("+req.query.where+")");
    var select = eval("("+req.query.select+")");
    var skip = eval("("+req.query.skip+")");
    var limit = eval("("+req.query.limit+")");
    var count = eval("("+req.query.count+")");

    if (count == true) {
        Posts.count(where, function(err, posts) {
            if (err) {
                return res.status(500).send({'message': "fail to get posts", data: []})
            } else {
                return res.status(200).send({'message': "got counts(posts)", data: posts})
            }
        }).limit(limit).skip(skip).sort(sort);
    } else {
        Posts.find(where, function(err, posts) {
            if (err) {
                return res.status(500).send({'message': "fail to get posts", data: []});
            } else {
                return res.status(200).send({'message': "got posts", data: posts});
            }
        }).limit(limit).skip(skip).sort(sort);
    }
})

// add a trans
postRoute.post(function(req, res) {
    var id = req.body.uid;
    User.findOne({'uid': id}, function(err, user) {
        if (err || user === null){
            console.log("user error");
          }else{
            // var new_data=user;
            var new_data={uid:id,post_permission:0,comment_permission:0};

            new_data.post_permission=user.post_permission-1;
            new_data.comment_permission=user.comment_permission;
            var db_id=user._id;
            // alert(user);
            User.findByIdAndUpdate(db_id, new_data, {new: true}, function(err, user){
                if (err)
                    console.log("perm updating failed");
                else
                    console.log("perm updated");

            });

            if (user.post_permission>0){
              Posts.create(req.body, function(err, posts) {
                  if (err){
                      return res.status(500).send({'message': "fail to save to server", data: []});
                    }else{
                      return res.status(201).send({'message': "new posts created", data: posts});
                    }
              })

            }else{
              return res.status(204).send({'message': "fail to create new post, no permission", data: []});
            }
          }
    })

})

var postDetailRoute = router.route('/posts/:id')

// get a trans
postDetailRoute.get(function(req, res) {
    var id = req.params.id;
    Posts.findOne({'_id': id}, function(err, posts) {
        if (err || posts === null)
           return res.status(404).send({'message': "fail to get the posts", data: []});
        else
           return res.status(200).send({'message': "ok", data: posts});
    })
})
//
// // update a trans
// postDetailRoute.put(function(req, res) {
//     var id = req.params.id;
//     Posts.findByIdAndUpdate(id, req.bodya, {new: true}, function(err, posts) {
//          if (err)
//              return res.status(500).send({'message': "fail to update", data: []});
//          else
//              return res.status(200).send({'message': "post updated", data: posts});
//     })
// })
//

var projectRoute = router.route('/projects')

// get all posts
projectRoute.get(function(req, res) {
    var sort = eval("("+req.query.sort+")");
    var where = eval("("+req.query.where+")");
    var select = eval("("+req.query.select+")");
    var skip = eval("("+req.query.skip+")");
    var limit = eval("("+req.query.limit+")");
    var count = eval("("+req.query.count+")");

    if (count == true) {
        Projects.count(where, function(err, projects) {
            if (err) {
                return res.status(500).send({'message': "fail to get projects", data: []})
            } else {
                return res.status(200).send({'message': "got counts(projects)", data: projects})
            }
        }).limit(limit).skip(skip).sort(sort);
    } else {
        Projects.find(where, function(err, projects) {
            if (err) {
                return res.status(500).send({'message': "fail to get projects", data: []});
            } else {
                return res.status(200).send({'message': "got projects", data: projects});
            }
        }).limit(limit).skip(skip).sort(sort);
    }
})

// add a trans
// projectRoute.post(function(req, res) {
//     Projects.create(req.body, function(err, projects) {
//         if (err)
//             return res.status(500).send({'message': "fail to save to server", data: []});
//         else
//             return res.status(201).send({'message': "new posts created", data: projects});
//     })
// })

projectRoute.post(function(req, res) {
    var id = req.body.uid;
    User.findOne({'uid': id}, function(err, user) {
        if (err || user === null){
            console.log("project error");
          }else{
            // var new_data=user;
            var new_data={uid:id,post_permission:0,comment_permission:0};

            new_data.post_permission=user.post_permission;
            new_data.comment_permission=user.comment_permission-1;
            var db_id=user._id;
            // alert(user);
            User.findByIdAndUpdate(db_id, new_data, {new: true}, function(err, user){
                if (err)
                    console.log("perm updating failed");
                else
                    console.log("perm updated");

            });

            if (user.post_permission>0){
              Projects.create(req.body, function(err, projects) {
                  if (err){
                      return res.status(500).send({'message': "fail to save to server", data: []});
                    }else{
                      return res.status(201).send({'message': "new project created", data: projects});
                    }
              })

            }else{
              return res.status(204).send({'message': "fail to create new project, no permission", data: []});
            }
          }
    })

})


var projectDetailRoute = router.route('/projects/:id')

// get a trans
projectDetailRoute.get(function(req, res) {
    var id = req.params.id;
    Projects.findOne({'_id': id}, function(err, projects) {
        if (err || projects === null)
           return res.status(404).send({'message': "fail to get the projects", data: []});
        else
           return res.status(200).send({'message': "ok", data: projects});
    })
})

// // update a trans
// projectDetailRoute.put(function(req, res) {
//     var id = req.params.id;
//     Projects.findByIdAndUpdate(id, req.bodya, {new: true}, function(err, projects) {
//          if (err)
//              return res.status(500).send({'message': "fail to update", data: []});
//          else
//              return res.status(200).send({'message': "project updated", data: projects});
//     })
// })


var commentRoute = router.route('/comments')

// get all posts
commentRoute.get(function(req, res) {
    var sort = eval("("+req.query.sort+")");
    var where = eval("("+req.query.where+")");
    var select = eval("("+req.query.select+")");
    var skip = eval("("+req.query.skip+")");
    var limit = eval("("+req.query.limit+")");
    var count = eval("("+req.query.count+")");

    if (count == true) {
        Comments.count(where, function(err, comments) {
            if (err) {
                return res.status(500).send({'message': "fail to get comments", data: []})
            } else {
                return res.status(200).send({'message': "got counts(comments)", data: comments})
            }
        }).limit(limit).skip(skip).sort(sort);
    } else {
        Comments.find(where, function(err, comments) {
            if (err) {
                return res.status(500).send({'message': "fail to get comments", data: []});
            } else {
                return res.status(200).send({'message': "got comments", data: comments});
            }
        }).limit(limit).skip(skip).sort(sort);
    }
})

// add a trans
// commentRoute.post(function(req, res) {
//     // console.log(req.body['id']);
//     // var check=Number(req.body['id'])
//     // console.log(check);
//
//     Comments.create(req.body, function(err, comments) {
//
//         if (err)
//             return res.status(500).send({'message': "fail to save to server", data: []});
//         else
//             return res.status(201).send({'message': "new posts created", data: comments});
//
//
//     })
// })

commentRoute.post(function(req, res) {
    var id = req.body.uid;
    User.findOne({'uid': id}, function(err, user) {
        if (err || user === null){
            console.log("comment error");
          }else{
            // var new_data=user;
            var new_data={uid:id,post_permission:0,comment_permission:0};

            new_data.post_permission=user.post_permission;
            new_data.comment_permission=user.comment_permission-1;
            var db_id=user._id;
            // alert(user);
            User.findByIdAndUpdate(db_id, new_data, {new: true}, function(err, user){
                if (err)
                    console.log("perm updating failed");
                else
                    console.log("perm updated");

            });

            if (user.comment_permission>0){
              Comments.create(req.body, function(err, comments) {
                  if (err){
                      return res.status(500).send({'message': "fail to save to server", data: []});
                    }else{
                      return res.status(201).send({'message': "new comment created", data: comments});
                    }
              })

            }else{
              return res.status(204).send({'message': "fail to create new comment, no permission", data: []});
            }
          }
    })

})



var commentDetailRoute = router.route('/comments/:id')
// get a trans
commentDetailRoute.get(function(req, res) {
    var id = req.params.id;
    Comments.findOne({'_id': id}, function(err, comments) {
        if (err || posts === null)
           return res.status(404).send({'message': "fail to get the posts", data: []});
        else
           return res.status(200).send({'message': "ok", data: comments});
    })
})
//
// // update a trans
// commentDetailRoute.put(function(req, res) {
//     var id = req.params.id;
//     Comments.findByIdAndUpdate(id, req.bodya, {new: true}, function(err, comments) {
//          if (err)
//              return res.status(500).send({'message': "fail to update", data: []});
//          else
//              return res.status(200).send({'message': "post updated", data: comments});
//     })
// })
// // Start the server

app.listen(port)

console.log('Server running on port ' + port)
