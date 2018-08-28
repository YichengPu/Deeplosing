var mongoose = require('mongoose')

var ProjectsSchema = new mongoose.Schema({
   id: Number,
   title:String,
   text: String,
   imageurl: String
})

module.exports = mongoose.model('Projects', ProjectsSchema);
