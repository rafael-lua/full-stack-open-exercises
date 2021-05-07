const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../../app")
const blogsHelper = require("./helpers/blogsHelper")
const usersHelper = require("./helpers/usersHelper")
const loginHelper = require("./helpers/loginHelper")

const api = supertest(app)

const Blog = require("../../models/blog")

beforeEach(async () => {
  await Blog.deleteMany({})

  const validUser = await usersHelper.getRootUser()
  const initialBlogsWithUser = blogsHelper.initialBlogs
    .map((blog) => ({ ...blog, user: validUser.id }))

  const blogsToAdd = initialBlogsWithUser
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

  it("should have the creator's user information", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const blog = response.body[0]
    expect(blog.user).toBeDefined()
    expect(blog.user).toHaveProperty("id")
    expect(blog.user).toHaveProperty("name")
    expect(blog.user).toHaveProperty("username")
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
    const rootUser = await usersHelper.getRootUser()
    const validToken = loginHelper.generateValidToken(rootUser)

    const blogListBefore = await blogsHelper.blogsInDabatase()
    const newBlog = {
      title: "Blog title 3",
      author: "Blog author 3",
      url: "myblog3.url",
      likes: 0
    }

    await api
      .post("/api/blogs")
      .auth(validToken, { type: "bearer" })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogListAfter = await blogsHelper.blogsInDabatase()

    expect(blogListAfter.length).toBe(blogListBefore.length + 1)
  })

  test("new blog entry has the correct content saved on database", async () => {
    const rootUser = await usersHelper.getRootUser()
    const validToken = loginHelper.generateValidToken(rootUser)

    const newBlog = {
      title: "Blog title 3",
      author: "Blog author 3",
      url: "myblog3.url",
      likes: 0
    }

    const addedBlog = await api
      .post("/api/blogs")
      .auth(validToken, { type: "bearer" })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const addedBlogInDatabase = await Blog.findById(addedBlog.body.id)

    newBlog.user = rootUser.id

    Object.keys(newBlog).forEach((key) => {
      expect(addedBlogInDatabase[key]).toBeDefined()
      if (key === "user") { // conversion check because mongoose objectid is weird
        const userId = addedBlogInDatabase[key].toString()
        expect(userId).toBe(newBlog[key])
      } else {
        expect(addedBlogInDatabase[key]).toBe(newBlog[key])
      }
    })

  })

  test("likes default to 0 if the property is missing from request", async () => {
    const rootUser = await usersHelper.getRootUser()
    const validToken = loginHelper.generateValidToken(rootUser)

    const newBlog = {
      title: "Blog title 3",
      author: "Blog author 3",
      url: "myblog3.url",
    }

    const addedBlog = await api
      .post("/api/blogs")
      .auth(validToken, { type: "bearer" })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const addedBlogInDatabase = await Blog.findById(addedBlog.body.id)
    expect(addedBlogInDatabase.likes).toBe(0)
  })

  test("return status code 400 if title or url properties are missing on request ", async () => {
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

describe("update a blog", () => {
  test("return status code 400 if likes property is missing on request", async () => {
    const blogList = await blogsHelper.blogsInDabatase()
    const blogToUpdate = blogList[0]

    const updateContent = {
      author: "Blog author 0"
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateContent)
      .expect(400)
      .expect("Content-Type", /application\/json/)
  })

  test("update the blog entry if likes property is sent correctly", async () => {
    const blogListBefore = await blogsHelper.blogsInDabatase()
    const blogToUpdate = blogListBefore[0]

    const updateContent = {
      likes: 123
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateContent)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const updatedBlog = await Blog.findById(blogToUpdate.id)
    expect(updatedBlog.likes).toBe(123)
  })
})

describe("delete a blog", () => {
  test("blog is successfully removed from blog list", async () => {
    const rootUser = await usersHelper.getRootUser()
    const validToken = loginHelper.generateValidToken(rootUser)

    const blogsListBefore = await blogsHelper.blogsInDabatase()
    const blogToDelete = blogsListBefore[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .auth(validToken, { type: "bearer" })
      .expect(204)

    const blogsListAfter = await blogsHelper.blogsInDabatase()
    expect(blogsListAfter.length).toBe(blogsListBefore.length - 1)
  })

  test("blog is not removed from blog list if request was not from the creator", async () => {
    const nonRootUser = await usersHelper.getNonRootUser()
    const validToken = loginHelper.generateValidToken(nonRootUser)

    const blogsListBefore = await blogsHelper.blogsInDabatase()
    const blogToDelete = blogsListBefore[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .auth(validToken, { type: "bearer" })
      .expect(401)
      .expect("Content-Type", /application\/json/)

    const blogsListAfter = await blogsHelper.blogsInDabatase()
    expect(blogsListAfter.length).toBe(blogsListBefore.length)
  })
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.disconnect()
  done()
})