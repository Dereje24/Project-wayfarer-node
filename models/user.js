var mongoose = require('mongoose'),
    Schema  = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    password: String,
    image: String
})

var User = mongoose.model('User', UserSchema);

module.exports = User;
