const logger = require("./logger")
const morgan = require("morgan")
const jwt = require("jsonwebtoken")
const config = require("./config")

morgan.token("has-data", function (req) {
  return (req.method === "POST" || req.method === "PUT") ? JSON.stringify(req.body) : null
})

const requestLogger = morgan(":method :url :status :res[content-length] - :response-time ms :has-data")

const unknownEndpoint = (red, res) => {
  res.status(404).send({ error: "Endpoint not found" })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.name)
  logger.error(error.message)

  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformatted id" })
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message })
  } else if (error.name === "JsonWebTokenError") {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

const jwtTokenExtractor = (req, res, next) => {
  let token = null
  const auth = req.get("authorization")
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    token = auth.substring(7)
  }
  req.body.token = token

  next()
}

const userExtractor = (req, res, next) => {
  req.user = null
  if (req.body.token) {
    req.user = jwt.verify(req.body.token, config.SECRET)
  }

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  jwtTokenExtractor,
  userExtractor
}