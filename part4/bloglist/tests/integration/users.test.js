const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../../app")
const usersHelper = require("./helpers/usersHelper")

const api = supertest(app)

beforeEach(async () => {
  await usersHelper.clearUsersInDatabase()
  await usersHelper.initializeUsersInDatabase()
})

describe("get all users", () => {
  it("should return all users in json format", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  it("should contain an array with the user's created blogs", async () => {
    const response = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const user = response.body[0]
    expect(user).toHaveProperty("blogs")
  })
})

describe("create new user", () => {
  it("should succeed inserting new user with valid data", async () => {
    const newUser = {
      username: "validuser",
      password: "validuser",
      name: "Valid User"
    }

    const newUserNameless = {
      username: "namelessvaliduser",
      password: "namelessvaliduser"
    }

    const usersBefore = await usersHelper.usersInDatabase()

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    await api
      .post("/api/users")
      .send(newUserNameless)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAfter = await usersHelper.usersInDatabase()

    expect(usersAfter.length).toBe(usersBefore.length + 2)
  })

  it("should fail inserting new user if any of the required data is missing or invalid", async () => {
    const invalidNewUsers = [
      {
        username: "nonvaliduser",
        name: "Missing data"
      },
      {
        username: "no",
        password: "nonvaliduser",
        name: "Small username"
      },
      {
        username: "nonvaliduser",
        password: "no",
        name: "Small password"
      }
    ]

    const usersBefore = await usersHelper.usersInDatabase()

    for (let i = 0; i < invalidNewUsers.length; i++) {
      await api
        .post("/api/users")
        .send(invalidNewUsers[i])
        .expect(400)
        .expect("Content-Type", /application\/json/)
    }

    const usersAfter = await usersHelper.usersInDatabase()

    expect(usersAfter.length).toBe(usersBefore.length)
  })
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.disconnect()
  done()
})