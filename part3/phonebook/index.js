const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());

morgan.token("post-data", function (req, res) { 
  return req.method === "POST" ? JSON.stringify(req.body) : null;
});

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post-data"));

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
];

app.get("/", (req, res) => {
  res.send("<h1>PHONEBOOK APP</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  let date = new Date();
  let amount = persons.length;
  res.send(`<p>Phobook has info for a total of ${amount} people.</p>${date}`);
});

app.get("/api/persons/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let person = persons.find((p) => p.id === id);

  if(person !== undefined) {
    res.json(person);
  }
  else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  let id = parseInt(req.params.id);
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

const generateId = () => {
  let newId = Math.floor(Math.random() * 1000000) + 1;
  return newId;
}

app.post("/api/persons", (req, res) => {
  let body = req.body;
  
  if(body.name === undefined) {
    return res.status(400).json(
      { error: "Empty name" }
    );
  } else if(body.number === undefined) {
    return res.status(400).json(
      { error: "Empty phone number" }
    );
  }

  let exists = !(persons.filter((p) => p.name.toUpperCase() === body.name.toUpperCase()).length === 0);

  if (exists === true) {
    return res.status(400).json(
      { error: "Name already exist on the list!" }
    );
  }
  else {
    let newPerson = {
      "name": body.name,
      "number": body.number,
      "id": generateId()
    }

    persons = persons.concat(newPerson);

    res.json(newPerson);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});