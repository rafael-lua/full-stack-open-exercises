const mongoose = require("mongoose");

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
  name: String,
  number: String
});

phoneSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
});

module.exports = mongoose.model("Phone", phoneSchema);
