import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Blog from "./Blog"

describe("<blog /> render", () => {
  it("should show (title, author) and hide (url, likes) on default", () => {
    const blog = {
      id: "myblogid",
      title: "a blog title",
      author: "the blogs author",
      url: "myurl",
      likes: 0,
      user: { name: "Super User", username: "root" }
    }

    const authUser = {
      name: "Super User",
      username: "root"
    }

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
    expect(titleElement).not.toHaveStyle({ display: "none" })

    const authorElement = component.container.querySelector(".blog-author")
    expect(authorElement).not.toHaveStyle({ display: "none" })

    const urlElement = component.container.querySelector(".blog-url")
    expect(urlElement).toHaveStyle({ display: "none" })

    const likesElement = component.container.querySelector(".blog-likes")
    expect(likesElement).toHaveStyle({ display: "none" })

  })
})