const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")
const mongoose = require("mongoose")

const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")

logger.info(`Connecting to database: ${config.MONGODB_URL}`)

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    logger.info("Succefully connected to MongoDB")
  })
  .catch((error) => {
    logger.error("Error when trying to connect to MongoDB: ", error)
  })

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
