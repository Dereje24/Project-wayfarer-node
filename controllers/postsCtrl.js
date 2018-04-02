var db = require('../models');
var Post = db.Post;
var util = require('./utils');
//var seedPosts = require('../seed/posts');


module.exports = {
  index: function index(req, res) {
    Post.find(function (err, allPosts) {
      err ? res.status(500).json({ error: err.message}) :
      res.json({posts: allPosts})
    });
  },

  create: function (req, res) {
    var newPost = req.body;
    Post.create(newPost, function (err, savedPost) {
      err ? res.status(500).json({ error: err.message}) :
      res.status(201).json(savedPost);
    });
  },

  show: function (req, res) {
    var postId = req.params.postId;
    Post.findOne({_id: postId}, util.getSingularResponse.bind(res));
  },

  destroy: function (req, res) {
    var postId = req.params.postId;
    Post.findOneAndRemove({ _id: postId}, util.getSingularResponse.bind(res));
  },

  update: function (req, res) {
    var postId = req.params.postId;
    var updatePost = req.body;
    Post.findOneAndUpdate({ _id: postId}, req.body, { new: true }, util.getSingularResponse.bind(res));
  }
};
