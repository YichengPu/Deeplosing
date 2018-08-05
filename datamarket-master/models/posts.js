var mongoose = require('mongoose')

var PostsSchema = new mongoose.Schema({
   id: Number,
   title:String,
   text: String,
   imageurl: String
})

module.exports = mongoose.model('Posts', PostsSchema);
