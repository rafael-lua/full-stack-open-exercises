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

module.exports = {
  verifyUser
}