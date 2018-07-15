// Get the packages we need
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    secrets = require('./config/secrets'),
    bodyParser = require('body-parser'),
    Data = require('./models/data'),
    Trans = require('./models/trans'),
    User = require('./models/user')


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
var userDetailRoute = router.route('/users:id')
userDetailRoute.get(function (req, res){
    var id = req.params.id;
    User.findOne({'_id': id}, function(err, user) {
        if (err || user === null)
            return res.status(404).send({'message': "user not found.", data: []});
        else
            return res.status(200).send({'message': "ok", data: user})
    })
})

// update a user detail
userDetailRoute.put(function(req, res) {
    var id = req.params.id;

    User.findByIdAndUpdate(id, req.body, {new: true}, function(err, user){
        if (err)
            return res.status(500).send({'message': "fail to update", data: []});
        else
            return res.status(200).send({'message': "user updated", data: user});;
    });
});

// get data
var dataRoute = router.route('/data')
dataRoute.get(function(req, res) {
    var sort = eval("("+req.query.sort+")");
    var where = eval("("+req.query.where+")");
    var select = eval("("+req.query.select+")");
    var skip = eval("("+req.query.skip+")");
    var limit = eval("("+req.query.limit+")");
    var count = eval("("+req.query.count+")");

    if (count === true) {
        Data.count(where, function(err, data) {
            if (err) {
                return res.status(500).send({'message': "Fail to get data", data: []});
            } else {
                return res.status(200).send({'message': "Got counts(data)", data: data});
            }
        }).limit(limit).skip(skip).sort(sort);
    } else {
        Data.find(where, function(err, data) {
            if (err) {
               return res.status(500).send({'message': "fail to get data", data: []});
            } else {
               return res.status(200).send({'message': "got data", data: data});
            }
        }).limit(limit).skip(skip).sort(sort);
    }
});

// add a dataset
dataRoute.post(function(req, res) {
    Data.create(req.body, function(err, data) {
        if (err){
            throw(err);
            return res.status(500).send({'message': "fail to save data", data: []});
        }else {
            return res.status(201).send({'message': "new dataset created", data: data});
          }
    })
})

var dataDetailRoute = router.route('/data:id')

// get dataset detail
dataDetailRoute.get(function(req, res) {
    var id = req.params.id;
    Data.findOne({'_id': id}, function(err, data) {
        if (err || data === null)
            return res.status(404).send({'message': "data not found", data: []});

})
})

// update a dataset
dataDetailRoute.put(function(req, res) {
    var id = req.params.id;
    Data.findByIdAndUpdate(id, req.body, {new: true}, function(err, data) {
        if (err)
            return res.status(500).send({'message': "fail to update data", data: []});
        else
            return res.status(200).send({'message': "data updated", data: data})

    });
})

var transRoute = router.route('/trans')

// get all trans
transRoute.get(function(req, res) {
    var sort = eval("("+req.query.sort+")");
    var where = eval("("+req.query.where+")");
    var select = eval("("+req.query.select+")");
    var skip = eval("("+req.query.skip+")");
    var limit = eval("("+req.query.limit+")");
    var count = eval("("+req.query.count+")");

    if (count == true) {
        Trans.count(where, function(err, trans) {
            if (err) {
                return res.status(500).send({'message': "fail to get trans", data: []})
            } else {
                return res.status(200).send({'message': "got counts(trans)", data: trans})
            }
        }).limit(limit).skip(skip).sort(sort);
    } else {
        Trans.find(where, function(err, trans) {
            if (err) {
                return res.status(500).send({'message': "fail to get trans", data: []});
            } else {
                return res.status(200).send({'message': "got trans", data: trans});
            }
        }).limit(limit).skip(skip).sort(sort);
    }
})

// add a trans
transRoute.post(function(req, res) {
    Trans.create(req.body, function(err, trans) {
        if (err)
            return res.status(500).send({'message': "fail to save to server", data: []});
        else
            return res.status(201).send({'message': "new trans created", data: trans});
    })
})

// get a trans
transRoute.get(function(req, res) {
    var id = req.params.id;
    Trans.findOne({'_id': id}, function(err, trans) {
        if (err || trans === null)
           return res.status(404).send({'message': "fail to get the trans", data: []});
        else
           return res.status(200).send({'message': "ok", data: trans});
    })
})

// update a trans
transRoute.put(function(req, res) {
    var id = req.params.id;
    Trans.findByIdAndUpdate(id, req.bodya, {new: true}, function(err, tran) {
         if (err)
             return res.status(500).send({'message': "fail to update", data: []});
         else
             return res.status(200).send({'message': "tran updated", data: tran});
    })
})

// Start the server

app.listen(port)

console.log('Server running on port ' + port)
