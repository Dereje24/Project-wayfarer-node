var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    db = require('./models/index'),
    passport = require('passport'),
    session = require('express-session'),
    LocalStrategy = require('passport-local').Strategy;

var User = db.User;
// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true })); // req.body
var usersCtrl = require('./controllers/usersCtrl');
var postsCtrl = require('./controllers/postsCtrl');
var indexCtrl = require('./controllers/index');

app.use(passport.initialize());
app.use(passport.session());

//passport config

passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

// auth routes
app.get('/api/users', usersCtrl.index);
app.delete('/api/users/:user_id', usersCtrl.destroy);
app.post('/signup', function signup(req,res) {
  console.log(`${req.body.username} ${req.body.password}`);
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.send(newUser);
      });
    }
)});
app.post('/login', passport.authenticate('local'), function (req, res) {
  //console.log(JSON.stringify(req.user));
  res.send(req.user);
});
app.get('/logout', function (req, res) {
  console.log("BEFORE logout", req);
  req.logout();
  res.send(req);
  console.log("AFTER logout", req);
});

// USERS
// Find one User
app.get('/api/users/:id', function(req, res){
  db.User.findOne({_id: req.params.id}, function(err, user){
    res.send(user);
  });
});
//
app.post('/api/users', function(req, res) {
  var user = new db.User(req.body);
  user.save(function(err) {
    if (err) { console.err(err); }
    console.log('Saved: ' + user)
  })
  res.send(user)

// db.User.findOne({firstName: req.body.user}, function(err, user){
//   if(err) {
//     return console.log(err);
//   };
// });
});

// Find all Users
app.get('/api/users', function(req, res) {
  db.User.find().populate('user')
  .exec(function(err, users){
    if(err){
      return console.log(err);
    }
    res.send(users);
  })
});

// Delete user - Will get back to this..*
// app.delete('/api/users/:id', function(req, res) {
//   console.log('user delete', req.params);
//   var userId = req.params.id;
//   db.User.findOneAndRemove({ _id: userId })
//     .exec(function (err, deletedUser) {
//       res.send(deletedUser);
//     });
// });

// Edit User

app.put('/api/users/:id', function(req, res) {
  var userId = req.params.id;
  db.User.findOneAndUpdate({_id: userId}, req.body, {new: true})
  .populate('user')
  .exec(function (err, updatedUser) {
    res.send(updatedUser);
  });
});

// create new posts
app.post('/api/posts', function (req, res) {
  var newPost = new db.Post({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location
  });
  console.log(newPost);
  newPost.save(function(err, post) {
    if (err) {
      return console.log("save error: " + err);
    }
    console.log("saved", post.title);
    res.send(post);
  });
});

// delete post
app.delete('/api/posts/:id', function (req, res) {
  console.log('posts delete', req.params);
  var postId = req.params.id;
  db.Post.findOneAndRemove({ _id: postId })
  .exec(function (err, deletePost) {
    res.send(deletePost);
  });
});

//update post
app.put('/api/posts/:id', function (req, res) {
  console.log('posts edit', req.params);
  console.log('body is', req.body);
  var postId = req.params.id;

  db.Post.findOneAndUpdate({ _id: postId }, req.body, {new: true})
    .populate('post')
    .exec(function (err, updatePost) {
      res.send(updatePost);
    });
});

// FIND LOCATIONS
app.get('/api/locations', function(req, res){
  db.Location.find().populate('locations')
  .exec(function(err, locations){
    if(err){
      return console.log(err);
    }
    res.send(locations);
  });
});


//POST ROUTES
app.route('/posts')
   .get(postsCtrl.index)
   .post(postsCtrl.create);

app.route('/posts/:postId')
    .get(postsCtrl.show)
    .put(postsCtrl.update)
    .delete(postsCtrl.destroy);

//USER ROUTES
app.route('/users')
   .get(usersCtrl.index)
   .post(usersCtrl.create);

app.route('/:userId')
   .get(usersCtrl.show)
   .put(usersCtrl.update)
   .delete(usersCtrl.destroy);


app.listen(process.env.PORT || 3000, function(){
  console.log('server started');
})
