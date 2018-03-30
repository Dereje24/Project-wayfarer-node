var mongoose = require('mongoose'),
    Schema  = mongoose.Schema,
    Post = require('./post');

var LocationSchema = new Schema({
    city: String,
    image: String,
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
})

var Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
