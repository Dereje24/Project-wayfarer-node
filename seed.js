var db = require('./models/index');
var faker = require('faker');
var count = process.argv[5];


db.User.remove({}, function() {
  console.log('DB cleared')
}).then(function(res){
  for (var i = 0; i < count; i++) {
    var user = new db.user({firstName: faker.firstName(), lastName: faker.lastName(), password: faker.password()});
    user.save(function(err){
      console.log(err);
      process.exit(0);
      return
    });
  }
  console.log('seeding complete');
  process.exit(0);
});
