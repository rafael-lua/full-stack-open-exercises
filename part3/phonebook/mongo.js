const mongoose = require("mongoose");

if(process.argv.length < 3) {
  console.log("Please, pass a password argument: node mongo.js password");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.akuye.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false, 
  useCreateIndex: true
});

const phoneSchema = mongoose.Schema({
  name: String,
  number: String
});

const Phone = mongoose.model("Phone", phoneSchema);

if(process.argv.length < 5) {
  Phone.find({}).then((result) => {
    result.forEach((phone) => {
      console.log(phone);
    });
    mongoose.connection.close();
  });
} else {
  let newName = process.argv[3];
  let newNumber = process.argv[4];
  let newPhone = new Phone({
    name: newName,
    number: newNumber
  });
  newPhone.save().then((result) => {
    console.log("Phone saved!");
    mongoose.connection.close();
  });
}