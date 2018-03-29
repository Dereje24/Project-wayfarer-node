var mongoose = require('mongoose'),
    Schema  = mongoose.Schema;

var LocationSchema = new Schema({
    title: String,
    post: String
})

var Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
