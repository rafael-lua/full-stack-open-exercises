import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import Blog from "./Blog"
import NewBlog from "./NewBlog"

describe("<blog /> render", () => {
  let blog
  let authUser

  beforeEach(() => {
    blog = {
      id: "myblogid",
      title: "a blog title",
      author: "the blogs author",
      url: "myurl",
      likes: 0,
      user: { name: "Super User", username: "root" }
    }

    authUser = {
      name: "Super User",
      username: "root"
    }
  })

  it("should show (title, author) and hide (url, likes) on default", () => {
    const dummyFunction = () => {
      return null
    }

    const component = render(
      <Blog
        blog={blog}
        updateBlog={dummyFunction}
        user={authUser}
        logger={dummyFunction}
        excludeBlog={dummyFunction}
      />
    )

    const titleElement = component.container.querySelector(".blog-title")
    const authorElement = component.container.querySelector(".blog-author")
    const urlElement = component.container.querySelector(".blog-url")
    const likesElement = component.container.querySelector(".blog-likes")

    expect(titleElement).not.toHaveStyle({ display: "none" })
    expect(authorElement).not.toHaveStyle({ display: "none" })
    expect(urlElement).toHaveStyle({ display: "none" })
    expect(likesElement).toHaveStyle({ display: "none" })

  })

  it("should show (title, author, url, likes) when button show is clicked", () => {
    const dummyFunction = () => {
      return null
    }

    const component = render(
      <Blog
        blog={blog}
        updateBlog={dummyFunction}
        user={authUser}
        logger={dummyFunction}
        excludeBlog={dummyFunction}
      />
    )

    const toggleButton = component.container.querySelector(".blog-toggle")
    fireEvent.click(toggleButton)

    const titleElement = component.container.querySelector(".blog-title")
    const authorElement = component.container.querySelector(".blog-author")
    const urlElement = component.container.querySelector(".blog-url")
    const likesElement = component.container.querySelector(".blog-likes")

    expect(titleElement).not.toHaveStyle({ display: "none" })
    expect(authorElement).not.toHaveStyle({ display: "none" })
    expect(urlElement).not.toHaveStyle({ display: "none" })
    expect(likesElement).not.toHaveStyle({ display: "none" })

  })

  it("should call the like button event handler 2x if like button is clicked 2x", () => {
    const dummyFunction = () => {
      return null
    }

    const likeHandler = jest.fn()

    const component = render(
      <Blog
        blog={blog}
        updateBlog={dummyFunction}
        user={authUser}
        logger={dummyFunction}
        excludeBlog={dummyFunction}
        handleLikeDebug={likeHandler}
      />
    )

    const likeButton = component.container.querySelector(".blog-like-button")
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeHandler.mock.calls).toHaveLength(2)

  })
})

describe("NewBlog component", () => {
  it("should pass the correct data for the create blog handler on submit", () => {
    const createHandler = jest.fn()

    const component = render(
      <NewBlog
        handleCreateDebug={createHandler}
      />
    )

    const createForm = component.container.querySelector("#create-blog-form")
    const titleField = component.container.querySelector("#create-blog-title")
    const authorField = component.container.querySelector("#create-blog-author")
    const urlField = component.container.querySelector("#create-blog-url")

    fireEvent.change(titleField, {
      target: { value: "new blog title" }
    })

    fireEvent.change(authorField, {
      target: { value: "new blog author" }
    })

    fireEvent.change(urlField, {
      target: { value: "new blog url" }
    })

    fireEvent.submit(createForm)

    expect(createHandler.mock.calls.length).toBe(1)
    expect(createHandler.mock.calls[0][0]).toBe("new blog title")
    expect(createHandler.mock.calls[0][1]).toBe("new blog author")
    expect(createHandler.mock.calls[0][2]).toBe("new blog url")

  })
})