const mongoose = require("mongoose")
const uniquePlugin = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
})

userSchema.plugin(uniquePlugin)
module.exports = mongoose.model("User", userSchema)
