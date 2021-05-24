const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../../app")
const usersHelper = require("./helpers/usersHelper")
const loginHelper = require("./helpers/loginHelper")

const api = supertest(app)

beforeEach(async () => {
  await usersHelper.clearUsersInDatabase()
  await usersHelper.initializeUsersInDatabase()
})

describe("login request", () => {
  it("should return a valid token and user data if credentials are correct", async () => {
    const rootUser = await usersHelper.getRootUser()
    const credentials = {
      username: "root",
      password: "root"
    }

    const loginResponse = await api
      .post("/api/login")
      .send(credentials)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const loggedUser = loginResponse.body
    const validatedUser = loginHelper.verifyUser(loggedUser.token)

    expect(loggedUser.name).toBe(rootUser.name)
    expect(validatedUser.username).toBe(rootUser.username)
    expect(validatedUser.id).toBe(rootUser.id)
  })
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.disconnect()
  done()
})