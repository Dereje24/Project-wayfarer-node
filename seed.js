var db = require('./models/index');
var faker = require('faker');
var bodyParser = require('body-parser');
var count = process.argv[5] || 5;

var usersList = [
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
    image: faker.image.image()
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
    image: faker.image.image()
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
    image: faker.image.image()
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
    image: faker.image.image()
  }
];

var locations = [
  {
    city: 'San Francisco',
    image: faker.image.image()
  },
  {
    city: 'Sydney',
    image: faker.image.image()
  },
  {
    city: 'London',
    image: faker.image.image()
  },
  {
    city: 'Seattle',
    image: faker.image.image()
  }
]

var posts = [
  {
    title: 'Interesting',
    description: 'Test description',
    location: 'San Francisco'
  },
  {
    title:'testing2',
    description: 'something cool',
    location: 'Sydney'
  },
  {
    title: 'Second post for SF',
    description: 'Test description 2',
    location: 'San Francisco'
  }
]

db.Post.remove({}, function(err){
  if(err){
    console.log(err, "something's wrong with removing posts")
  }
  console.log("removed all posts");
  db.Post.create(posts, function(err, success){
    if(err){
      return console.log(err);
    };
    console.log("CREATED POSTS", success);
  });
});

db.User.remove({}, function(err){
  console.log("removed all users!")
  db.User.create(usersList, function(err, success){
    if(err){
      console.log("there was an error!", err)
      return;
    }
    console.log("created a user!", success)
  })
console.log("Seed complete");
});

db.Location.remove({}, function(err){
  console.log('removed all locations');

locations.forEach(function(locationData){
  console.log('trying to find one city', locationData.city);
  var local = new db.Location({
    city: locationData.city,
    image: locationData.image
  });
  db.Post.find({location: locationData.city}, function(err, foundPost){
    console.log('logging what foundPost is after line 104', foundPost);
    if(err){
      console.log('Error finding loation', err);
    }
    local.posts = foundPost;
    console.log('local.post on 110', local.posts);
    local.save(function(err, savedLocal){
      if(err){
        return console.log(err);
      }
      console.log('savedLocal', savedLocal);
    })
    // local.posts.push(foundPost);
    // local.save(function(err, savedLocal){
    //   if (err){
    //     console.log('save did not work', err)
    //   }
    // });
    console.log('saved local', local)
  });

 });
});

//   db.Location.create(locations, function(err, success){
//     if(err){
//       console.log(err)
//       return;
//     }
//     console.log('location created', success);
//   });
//   console.log('location seed compeleted');
// })
