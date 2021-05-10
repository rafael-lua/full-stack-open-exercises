import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Blog from "./Blog"

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
})