var mongoose = require('mongoose');
var Location = require('./location');
var Post = require('./post');
var User = require('./user');
var dbUrl = process.env.MONGODB_URI || 'mongodb://localhost/wayfarer';

mongoose.connect(dbUrl, {promiseLibrary: global.Promise});

module.exports = {
  User: User,
  Post: Post,
  Location: Location
};
