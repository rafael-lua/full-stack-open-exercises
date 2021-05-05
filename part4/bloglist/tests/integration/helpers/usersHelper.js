const User = require("../../../models/user")

const initialUsers = [
  {
    username: "root",
    password: "root",
    name: "Super User"
  },
  {
    username: "ilikelua",
    password: "ilikelua",
    name: "Rafael Lua"
  }
]

const usersInDatabase = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const validUserId = async () => {
  const rootUser = await User.findOne({ username: "root" })
  return rootUser._id
}

const clearUsersInDatabase = async () => {
  await User.deleteMany({})
}

const initializeUsersInDatabase = async () => {
  await User.insertMany(initialUsers)
}

module.exports = {
  initialUsers,
  usersInDatabase,
  validUserId,
  clearUsersInDatabase,
  initializeUsersInDatabase
}