var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

var ctrl = require('./controllers');

app.route('/locations').get(ctrl.locations.index)
    .post(ctrl.locations.create);

app.route('/locations/:locationId')
    .get(ctrl.locations.show);

//POST ROUTES
app.route('./posts')
   .get(ctrl.posts.index)
   .post(ctrl.posts.create);

app.route('/posts/:postId')
    .get(ctrl.posts.show)
    .put(ctrl.posts.update)
    .delete(ctrl.posts.destroy);

//USER ROUTES
app.route('./users')
   .get(ctrl.users.index)
   .post(ctrl.users.create);

app.route('./:userId')
   .get(ctrl.users.show)
   .put(ctrl.users.update)
   .delete(ctrl.users.destroy);


app.listen(process.env.PORT || 3000, function(){
  console.log('server started');
})
