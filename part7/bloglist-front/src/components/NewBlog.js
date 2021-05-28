import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { createBlog } from "../reducers/blogReducer"

import styled from "styled-components"

const StyledButton = styled.button`
  width: 15%;
  margin: 0.5em 0.5em;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.5em;
  outline: none;
  padding: 0.25em 0.5em;
  background-color: rgba(0, 0, 155, 0.1);

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 155, 0.25);
  }
`


const StyledControl = styled.div`
  margin: 0.5em 0;
`

const StyledLabel = styled.label`
  display: inline-block;
  width: 75px;
  font-weight: 500;
  font-size: 1.05em;
`

const NewBlog = ({ toggleIt }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleChanges = (type, value) => {
    switch (type) {
      case "title":
        setTitle(value)
        break

      case "author":
        setAuthor(value)
        break

      case "url":
        setUrl(value)
        break

      default:
        break
    }
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    dispatch(createBlog(newBlog))
    toggleIt("newBlog")
  }

  return (
    <div>
      <h3><em>Create a new blog:</em></h3>
      <form id="create-blog-form" onSubmit={handleCreateBlog}>
        <StyledControl>
          <StyledLabel>Title <small>(*)</small></StyledLabel>
          <input id="create-blog-title" type="text" value={title} onChange={({ target }) => {handleChanges("title", target.value)}} />
        </StyledControl>
        <StyledControl>
          <StyledLabel>Author</StyledLabel>
          <input id="create-blog-author" type="text" value={author} onChange={({ target }) => {handleChanges("author", target.value)}} />
        </StyledControl>
        <StyledControl>
          <StyledLabel>Url <small>(*)</small></StyledLabel>
          <input id="create-blog-url" type="text" value={url} onChange={({ target }) => {handleChanges("url", target.value)}} />
        </StyledControl>
        <StyledButton id="create-blog-submit" type="submit">Add</StyledButton>
      </form>
    </div>
  )
}

export default NewBlog
