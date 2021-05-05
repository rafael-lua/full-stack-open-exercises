const logger = require("./logger")
const morgan = require("morgan")

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
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}