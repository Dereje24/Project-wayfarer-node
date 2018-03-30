var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    db = require('./models/index');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

var usersCtrl = require('./controllers/usersCtrl');
var postsCtrl = require('./controllers/postsCtrl');

// app.route('/locations').get(ctrl.locations.index)
//     .post(ctrl.locations.create);
//
// app.route('/locations/:locationId')
//     .get(ctrl.locations.show);
app.post('/api/users', function(req, res) {
  var user = new db.User(req.body);
  user.save(function(err) {
    if (err) { console.err(err); }
    console.log('Saved: ' + user)
  })
  res.send(user)
})

// app.post('/api/locations', function(req, res) {
//   console.log('testing locations route');
//   var
// })
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
