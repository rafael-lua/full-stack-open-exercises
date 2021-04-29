const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

mongoose.connect(url, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false, 
  useCreateIndex: true
}).then(result => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
});

const phoneSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  number: String
});


// Some explanation on toJSON. The express response.json will use stringfy in the passed object, 
// which will call the toJSON method defined here.

//https://mongoosejs.com/docs/guide.html#virtuals
/*
  If you use toJSON() or toObject() mongoose will not include virtuals by default. 
  This includes the output of calling JSON.stringify() on a Mongoose document, because JSON.stringify() 
  calls toJSON(). Pass { virtuals: true } to either toObject() or toJSON().
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description
*/

// The toJSON is set as a option in the schema, that will become part of the prototype chain. 
// After creating a object with "new" from the model created/exported, call console.log(Object.getPrototypeOf(object))
// to see the the toJSON method defined in the prototype chain.
phoneSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
});

phoneSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Phone", phoneSchema);
