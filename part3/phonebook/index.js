require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()
app.use(express.static("build"))
app.use(express.json())

morgan.token("has-data", function (req) {
  return (req.method === "POST" || req.method === "PUT") ? JSON.stringify(req.body) : null
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :has-data"))

app.use(cors())

const Person = require("./models/phone")

// let persons = [
//   {
//     "name": "Arto Hellas",
//     "number": "040-123456",
//     "id": 1
//   },
//   {
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523",
//     "id": 2
//   },
//   {
//     "name": "Dan Abramov",
//     "number": "12-43-234345",
//     "id": 3
//   },
//   {
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122",
//     "id": 4
//   }
// ];

app.get("/", (req, res) => {
  res.send("<h1>PHONEBOOK APP</h1>")
})

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch((error) => {next(error)})
})

app.get("/info", (req, res, next) => {
  let date = new Date()
  Person.find({}).then((persons) => {
    let amount = persons.length
    res.send(`<p>Phonebook has info for a total of ${amount} people.</p>${date}`)
  })
    .catch((error) => {next(error)})
})

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id).then((person) => {
    if(person !== null) {
      res.json(person)
    }
    else {
      res.status(404).end()
    }
  })
    .catch((error) => {next(error)})

  // let id = parseInt(req.params.id);
  // let person = persons.find((p) => p.id === id);

  // if(person !== undefined) {
  //   res.json(person);
  // }
  // else {
  //   res.status(404).end();
  // }
})

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => {next(error)})

  // let id = parseInt(req.params.id);
  // persons = persons.filter((p) => p.id !== id);

  // res.status(204).end();
})

app.put("/api/persons/:id", (req, res, next) => {
  let body = req.body

  if(body.number === undefined || body.number === "") {
    return res.status(400).json({ error: "Empty phone number" })
  }

  const person = {
    name: body.name,
    number: body.number
  }

  const opt = {
    runValidators: true, // Activate validators for update methods (https://mongoosejs.com/docs/validation.html#update-validators)
    new: true
  }

  Person.findByIdAndUpdate(req.params.id, person, opt)
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((error) => {next(error)})
})

app.post("/api/persons", (req, res, next) => {
  let body = req.body

  if(body.name === undefined || body.name === "") {
    return res.status(400).json(
      { error: "Empty name" }
    )
  } else if(body.number === undefined || body.number === "") {
    return res.status(400).json(
      { error: "Empty phone number" }
    )
  }

  let person = new Person({
    "name": body.name,
    "number": body.number,
  })

  person.save()
    .then((newPerson) => {
      console.log("New person saved!")
      res.json(newPerson)
    })
    .catch((error) => {next(error)})

  // let exists = !(persons.filter((p) => p.name.toUpperCase() === body.name.toUpperCase()).length === 0);

  // if (exists === true) {
  //   return res.status(400).json(
  //     { error: "Name already exist on the list!" }
  //   );
  // }
  // else {
  //   let newPerson = {
  //     "name": body.name,
  //     "number": body.number,
  //   }

  //   persons = persons.concat(newPerson);

  //   res.json(newPerson);
  // }
})

/* --------------- Error middleware. It has to be the last one. -------------- */

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") { // Handle CastErrors (https://mongoosejs.com/docs/api/mongooseerror.html)
    return response.status(400).send({ error: "Malformatted id" })
  } else if (error.name === "ValidationError") {
    console.log("--- Validation error ---")
    return response.status(400).send({ error: error.message })
  }

  next(error) // If not handled, forwards the error to express default handler.
}

app.use(errorHandler)

// const PORT = (process.env.PORT === undefined || process.env.PORT === null) ? 3001 : process.env.PORT;
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})