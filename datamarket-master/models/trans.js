var mongoose = require('mongoose')

var TransSchema = new mongoose.Schema({
   id: Number,
   seller: Number,
   buyer: Number,
   data: Number,
   price: Number,
   comment: String
})

module.exports = mongoose.model('Trans', TransSchema);
