require('dotenv').config();
var mongoose = require('mongoose');
const MONGO_URI = process.env['MONGO_URI'];
let connect = mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

function buildpersonne(data) {

  return new Person({
    name: data.name,
    age: data.age,
    favoriteFoods: data.favoriteFoods
  })
}

const createAndSavePerson = (done) => {

  let personne = buildpersonne(data = { name: 'John', age: 32, favoriteFoods: ['croissant', 'baguette'] });
  personne.save()
    .then(doc => {
      console.log(doc);
      done(null, doc);
    })
    .catch(err => {
      console.log(err)
      done(err);
    });

};
/*
createAndSavePerson((err, doc) => {
  if (err) {
    console.error(err);
  } else {
    console.log(doc);
  }
});
*/

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople).then(doc => {
    console.log(doc)
    done(null, doc);
  }).catch(err => {
    console.log(err)
    done(err);
  });
};

const arrayOfpeople = [{ name: 'John', age: 32, favoriteFoods: ['croissant', 'baguette'] }, { name: 'Marc', age: 29, favoriteFoods: ['bolognesa', 'riz poulet'] }];
/*
createManyPeople(arrayOfpeople, (err,  doc) => {
  if (err) {
    console.error(err);
  } else {
    console.log(doc);
  }
});
*/
const findPeopleByName = (personName, done) => {
  Person
    .find({
      name: personName   // search query
    })
    .then(doc => {
      console.log(doc)
      done(null, doc);
    })
    .catch(err => {
      console.error(err)
      done(err);
    })
};

//let personName = 'Marc';
/*
findPeopleByName(personName, (err,  doc) => {
  if (err) {
    console.error(err);
  } else {
    console.log(doc);
  }
});
*/

const findOneByFood = (food, done) => {
  Person
    .findOne({
      favoriteFoods: food   // search query
    })
    .then(doc => {
      console.log(doc)
      done(null, doc);
    })
    .catch(err => {
      console.err(err)
      done(err);
    })
};

const food = ['croissant', 'baguette'];
/*
findOneByFood(food, (err, doc) => {
    if (err) {
    console.error(err);
  } else {
    console.log(doc);
  }
});
*/
const findPersonById = (personId, done) => {
  Person
    .findByIdAndDelete({
      _id: personId  // search query
    })
    .then(doc => {
      console.log(doc)
      done(null, doc);
    })
    .catch(err => {
      console.error(err)
      done(err);
    })
};

//const personId= '63bebd62ee283a01bd97fa65';
/*
findPersonById(personId, (err, doc) => {
    if (err) {
    console.error(err);
  } else {
    console.log(doc);
  }
});
*/
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};
const personId = '63bebd9b1cd54d01f78c689a';
/*
findEditThenSave(personId, (err, doc) => {
  if (err) {
    console.error(err);
  } else {
    console.log(doc);
  }
});
*/
let personName = 'John';
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, { $set: {age: ageToSet} }, {new: true}, (err, doc) => {
    if (err) return done(err);
    done(null, doc);
  });
};
/*
findAndUpdate(personName, (err, doc) => {
  if (err) {
    console.error(err);
  } else {
    console.log(doc);
  }
});
*/
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, doc) => {
    if (err) return done(err);
    done(null,doc);
  });
};
/*
removeById(personId, (err, doc) => {
  if (err) {
    console.error(err);
  } else {
    console.log(doc);
  }
});
*/
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err,doc) => {
    if (err) return done(err);
    done(null,doc);
});
};
/*
removeManyPeople((err, doc) => {
  if (err) {
    console.error(err);
  } else {
    console.log(doc);
  }
});
*/
const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: {$in: [foodToSearch]}}).sort({name: 1}).limit(2).select({name: 1, favoriteFoods : 1}).exec(function(err, people){
    if(err) return done(err);
    done(null, people);
  });
};
queryChain((err, doc) => {
  if (err) 
    console.error(err);
  else 
    console.log(doc);
});
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
