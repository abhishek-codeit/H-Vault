//const express =  require('express');
const mongoose = require('mongoose');
//const app = express();


const mongoDB = "mongodb://127.0.0.1:27017/datab";  // fruits is the database

mongoose.connect(mongoDB)
  .then(() => { console.log('Successfully connected to MongoDB'); })
  .catch((err) => { console.error('Error connecting to MongoDB', err); });

const fruitschema = new mongoose.Schema({
  name : {
    type : String,
    required :[true , "please check your data no name"]  // validation of name
  },
  rating : {
    type : Number,   // validation
    min : 1,
    max : 10
  },
  review : String
});

const Fruit = mongoose.model("fuit",fruitschema);  // collection name fruit
const fruit = new Fruit({
  name : "apple",
  rating :  4,
  review : "good one"
})
 
fruit.save();
//fruit.save();
// const kiwi = new Fruit({
//   name : "kiwi",
//   rating : 4
// });

// const banana = new Fruit({
//   name : "banana",
//   rating : 9
// });
//fruit.save();  // to insert

// Fruit.insertMany([kiwi,banana]).then(function(){
//     console.log("Data inserted")  // Success
// }).catch(function(error){
//     console.log(error)      // Failure
// });


// Fruit.find().then((fruits)=>{  // to fetch from the database
//   //console.log(fruits);
//   mongoose.connection.close();
//   fruits.forEach(function(i){
//     console.log(i.name);
//   })
// }).catch((err)=>{
//   console.log(err);
// })

// Fruit.updateOne({name : "apple"},{name:"bannnna"}).then(function(){
//   console.log("data updated");
// }).catch(function(err){
//   console.log(err);
// })  // use this then and catch we can't use the callback function

// Fruit.deleteOne({name:"banana"}).then(function(){
//   console.log("deleted that one");
// }).catch(function(err){
//   console.log(err);
// })

const personSchema = new mongoose.Schema({   // new collection
  name : String,
  age : Number,
  fav  : String
}) 

const Person = mongoose.model("person",personSchema);

const per = new Person({
  name : "any",
  age : 12,
  fav : fruit   // relationships in the mongodb
})

per.save();
// app.listen(3000,()=>{
//   console.log("server is running on port:5000");
// })

//----------------------------------------------------------------