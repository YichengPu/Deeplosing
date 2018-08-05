// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    uid: Number,
    post_permission: Number,
    comment_permission: Number
    // name: String,
    // email: String,
    // password: Number,
    // post: String,
    // comments: {
    //     content: String,
    //     commented_by: String
    // },
    // data: [String]
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
