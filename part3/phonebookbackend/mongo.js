const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb://fullstack:${password}@cluster0-shard-00-00.ndes6.mongodb.net:27017,cluster0-shard-00-01.ndes6.mongodb.net:27017,cluster0-shard-00-02.ndes6.mongodb.net:27017/phonebook-app?ssl=true&replicaSet=atlas-ix87wv-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length == 5) {

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    id: 100,
  });
  
  person.save().then(result => {
    console.log('person saved');
    mongoose.connection.close();
  });
  
} else if (process.argv.length == 3) {

  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}

