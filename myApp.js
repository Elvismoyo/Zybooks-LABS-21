
let mongoose = require('mongoose');

require('dotenv').config();
const URI = process.env.MONGO_URI;


mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });



var { Schema } = mongoose;

var personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
var Person = mongoose.model("Person", personSchema);


var elv = new Person({
  name: "Elvis",
  age: 22,
  favoriteFoods: ['Encebollado', 'Fish and chips']
});


// var arrayOfPeople = [
//   {name: "Luffy", age: 19, favoriteFoods: ["T-bone"]},
//   {name: "Zoro", age: 21, favoriteFoods: ["Sake"]},
//   {name: "Choppe", age: 19, favoriteFoods: ["Chicken Teriyaki"]}
// ];


const createAndSavePerson = (done) => {
 

  elv.save(function(err, data) {
    if (err) return done(err);
  return done(null, data);
  
  });
  
};
var createManyPeople = function(arrayOfPeople, done){
  
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    return done(null, people);
});
}

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    return done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    return done(null, data);
})
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    return done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // find if the person with a specifc id exists
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // if it exists then we add "hamburger" to the favortieFoods Field
    person.favoriteFoods.push(foodToAdd);

    // Getting up to here means everythign else was done correctly or if any error occurres we catch it up
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      return done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
   return done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  // It will remove if it matches the field we want
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    return done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  
  Person.find({favoriteFoods: foodToSearch})
  .sort({ name: 'asc' })
  .limit(2)
  .select('-age')
  .exec(function(error, data) {
    //do something here
    if(error) return console.log(error);
    return done(null, data);
  });

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
