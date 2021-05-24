const _ = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else {
    return blogs.reduce((total, blog) => {
      total += blog.likes
      return total
    }, 0)
  }
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  } else {
    let bestBlog = blogs.reduce((bestBlog, currentBlog) => {
      return currentBlog.likes >= bestBlog.likes ? currentBlog : bestBlog
    })
    let fav = {
      title: bestBlog.title,
      author: bestBlog.author,
      likes: bestBlog.likes
    }
    return fav
  }
}

const getAuthor = (e) => {
  return e.author
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) { return null }

  const blogsGroupedByAuthor = _.groupBy(blogs, getAuthor)
  const authorWithTheMostBlogs = _.reduce(blogsGroupedByAuthor, (most, current) => {
    return current.length >= most.length ? current : most
  })

  return { author: authorWithTheMostBlogs[0].author, blogs: authorWithTheMostBlogs.length }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) { return null }

  const flatWithLikes = (e, key) => {
    return { author: key, likes: e.reduce((total, current) => { return total + current.likes }, 0) }
  }

  const blogsGroupedByAuthor = _.groupBy(blogs, getAuthor)
  const authorsListWithMostLikes = _.flatMap(blogsGroupedByAuthor, flatWithLikes)

  return authorsListWithMostLikes.reduce((most, current) => { return current.likes >= most.likes ? current : most })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}