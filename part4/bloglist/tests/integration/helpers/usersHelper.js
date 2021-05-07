const User = require("../../../models/user")
const bcrypt = require("bcrypt")

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
const getRootUser = async () => {
  const rootUser = await User.findOne({ username: "root" })
  return rootUser.toJSON()
}

const clearUsersInDatabase = async () => {
  await User.deleteMany({})
}

const initializeUsersInDatabase = async () => {
  const hashedUsers = await Promise.all(initialUsers.map(async (user) => {
    let hashedUser = { ...user }
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(hashedUser.password, saltRounds)
    delete hashedUser.password
    hashedUser.passwordHash = hashedPassword
    return hashedUser
  }))
  await User.insertMany(hashedUsers)
}

module.exports = {
  initialUsers,
  usersInDatabase,
  clearUsersInDatabase,
  initializeUsersInDatabase,
  getRootUser
}