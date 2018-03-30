var mongoose = require('mongoose'),
    Schema  = mongoose.Schema,
    Post = require('./post');

var LocationSchema = new Schema({
    title: String,
    image: String,
    post: [{type: Schema.Type.ObjectId, ref: 'Post'}]
})

var Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
