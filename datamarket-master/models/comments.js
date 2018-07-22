var mongoose = require('mongoose')

var CommentsSchema = new mongoose.Schema({
   id: Number,
   postid: Number,
   comment: String
})

module.exports = mongoose.model('Comments', CommentsSchema);
