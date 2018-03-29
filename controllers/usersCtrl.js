var db = require('../models');
var User = db.User;
var util = require('./utils');
var seedUsers = require('../seed/users')


module.exports = {
  index: function index(req, res) {
    User.find(function (err, allUsers) {
      err ? res.status(500).json({ error: err.message}) :
      res.json({books: allUsers})
    });
  },

  create: function (req, res) {
    var newUser = req.body;
    User.create(newUser, function (err, savedUser) {
      err ? res.status(500).json({ error: err.message}) :
      res.status(201).json(savedUser);
    });
  },

  show: function (req, res) {
    var userId = req.params.userId;
    User.findOne({_id: userId}, util.getSingularResponse.bind(res));
  },

  destroy: function (req, res) {
    var userId = req.params.userId;
    User.findOneAndRemove({ _id: userId}, util.getSingularResponse.bind(res));
  },

  update: function (req, res) {
    var userId = req.params.userId;
    var updateUser = req.body;
    User.findOneAndUpdate({ _id: userId}, req.body, { new: true }, util.getSingularResponse.bind(res));
  }

};
