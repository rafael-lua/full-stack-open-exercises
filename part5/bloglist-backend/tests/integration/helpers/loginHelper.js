const jwt = require("jsonwebtoken")
const config = require("../../../utils/config")

const verifyUser = (token) => {
  try {
    const validUser = jwt.verify(token, config.SECRET)
    return validUser
  } catch (error) {
    return null
  }
}

const generateValidToken = (user) => {
  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(
    userForToken,
    config.SECRET,
    { expiresIn: 60*60 } // One hour expiration
  )

  return token
}

module.exports = {
  verifyUser,
  generateValidToken
}