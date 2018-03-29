var mongoose = require('mongoose'),
    Schema  = mongoose.Schema;

var PostSchema = new Schema({
    title: String,
    description: String,
    location: String
})

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
