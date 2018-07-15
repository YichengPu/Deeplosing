var mongoose = require('mongoose')

var DataSchema = new mongoose.Schema({
    id: Number,
    name: String,
    owner: [String],
    shape: [Number],
    size: Number,
    description: String,
    source: String
});

module.exports = mongoose.model('Data', DataSchema);
