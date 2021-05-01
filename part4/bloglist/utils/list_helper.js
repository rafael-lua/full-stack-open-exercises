const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    return blogs[0].likes
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
  } else if (blogs.length === 1) {
    let fav = {
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes
    }
    return fav
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}