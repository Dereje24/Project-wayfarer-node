var mongoose = require('mongoose');
var Location = require('./location');
var Post = require('./post');
var User = require('./user');

mongoose.connect('mongodb://localhost/', {promiseLibrary: global.Promise});


module.exports = {
  User: User,
  Post: Post,
  Location: Location
};
