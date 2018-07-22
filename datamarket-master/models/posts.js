var mongoose = require('mongoose')

var PostsSchema = new mongoose.Schema({
   id: Number,
   text: String
})

module.exports = mongoose.model('Posts', PostsSchema);
