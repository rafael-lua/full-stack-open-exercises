const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../../app")
const blogsHelper = require("./blogsHelper")

const api = supertest(app)

const Blog = require("../../models/blog")

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogsToAdd = blogsHelper.initialBlogs
    .map((blog) => new Blog(blog))

  const savePromises = blogsToAdd
    .map((blog) => blog.save())

  await Promise.all(savePromises)
})

describe("get all blogs", () => {
  test("blogs list is returned in json format", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("blogs list has the correct amount of blogs", async () => {
    const amountToCheck = blogsHelper.initialBlogs.length

    const blogsList = await blogsHelper.blogsInDabatase()

    expect(blogsList.length).toBe(amountToCheck)
  })

  test("all blogs should have the id property defined", async () => {
    const blogList = await blogsHelper.blogsInDabatase()

    blogList.forEach((blog) => {
      expect(blog.id).toBeDefined()
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})