import blogService from "../services/blogs"

import { setNotification } from "./notificationReducer"

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INITIALIZE_BLOGS": {
      return action.data
    }

    case "CREATE_BLOG": {
      const newState = [...state, action.data]
      return newState
    }

    case "UPDATE_BLOG": {
      const newState = state.map((blog) => {
        return blog.id === action.data.id ? action.data : blog
      })
      return newState
    }

    case "DELETE_BLOG": {
      const newState = state.filter((blog) => {
        return blog.id !== action.data
      })
      return newState
    }

    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: "INITIALIZE_BLOGS",
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(blog)
      dispatch({
        type: "CREATE_BLOG",
        data: createdBlog
      })
      dispatch(setNotification(`Blog ${createdBlog.title} created with success!`, "success"))
    } catch (exception) {
      dispatch(setNotification("Cannot create new blog. Make sure to fill at least Title and URL fields", "error"))
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newLikes = blog.likes + 1
      const updatedBlog = await blogService.update(blog, newLikes)
      dispatch({
        type: "UPDATE_BLOG",
        data: updatedBlog
      })
    } catch (exception) {
      dispatch(setNotification("You can't like this blog", "error"))
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch({
        type: "DELETE_BLOG",
        data: blog.id
      })
    } catch (exception) {
      dispatch(setNotification("You can't delete this blog", "error"))
    }
  }
}

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    try {
      const commentedBlog = await blogService.sendComment(blog, comment)
      dispatch({
        type: "UPDATE_BLOG",
        data: commentedBlog
      })
    } catch (exception) {
      dispatch(setNotification("You can't comment this blog", "error"))
    }
  }
}

export default reducer