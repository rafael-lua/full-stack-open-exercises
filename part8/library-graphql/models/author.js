const mongoose = require("mongoose")
const uniquePlugin = require("mongoose-unique-validator")

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  born: {
    type: Number,
  },
})

schema.plugin(uniquePlugin)
module.exports = mongoose.model("Author", schema)
