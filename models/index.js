var mongoose = require('mongoose');
var Location = require('./location');
var Post = require('./post');
var User = require('./user');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/wayfarer');

module.exports = {
  User: User,
  Post: Post,
  Location: Location
};
