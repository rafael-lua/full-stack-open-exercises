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

module.exports = {
  initialUsers,
  usersInDatabase
}