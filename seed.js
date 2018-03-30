var db = require('./models/index');
var faker = require('faker');
var bodyParser = require('body-parser');
var count = process.argv[5] || 5;

console.log("hello!")
db.User.remove({}, function(err, users){
  console.log("removed all users!")
  db.User.create({firstName: faker.name.firstName(), lastName: faker.name.lastName(), password: faker.internet.password(), image: "hi"}, function(err, success){
    if(err){
      console.log("there was an error!", err)
      return;
    }
    console.log("created a user!", success)
  })
console.log("Seed complete");
});
