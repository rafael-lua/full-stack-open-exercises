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

describe("create a new blog", () => {
  test("blogs list is increased by 1 after creating a new entry", async () => {
    const blogListBefore = await blogsHelper.blogsInDabatase()
    const newBlog = {
      title: "Blog title 3",
      author: "Blog author 3",
      url: "myblog3.url",
      likes: 0
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogListAfter = await blogsHelper.blogsInDabatase()

    expect(blogListAfter.length).toBe(blogListBefore.length + 1)
  })

  test("new blog entry has the correct content saved on database", async () => {
    const newBlog = {
      title: "Blog title 3",
      author: "Blog author 3",
      url: "myblog3.url",
      likes: 0
    }

    const addedBlog = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const addedBlogInDatabase = await Blog.findById(addedBlog.body.id)
    expect(addedBlogInDatabase).toMatchObject(newBlog)
  })

  test("likes default to 0 if the property is missing from request", async () => {
    const newBlog = {
      title: "Blog title 3",
      author: "Blog author 3",
      url: "myblog3.url",
    }

    const addedBlog = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const addedBlogInDatabase = await Blog.findById(addedBlog.body.id)
    expect(addedBlogInDatabase.likes).toBe(0)
  })

  test("status code 400 if title or url properties are missing on request ", async () => {
    const newBlog = {
      author: "Blog author 3",
      likes: 0
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/)
  })
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close()
  done()
})