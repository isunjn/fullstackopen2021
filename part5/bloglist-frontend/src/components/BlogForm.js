import React, { useState } from 'react'

const BlogForm = ({ createNewBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()

    createNewBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleCreateNewBlog}>
        <div>
          Title:
          <input type="text" value={newTitle} name="Title" id="title"
            onChange={({ target }) => setNewTitle(target.value)}/>
        </div>
        <div>
          Author:
          <input type="text" value={newAuthor} name="Author" id="author"
            onChange={({ target }) => setNewAuthor(target.value)}/>
        </div>
        <div>
          URL:
          <input type="text" value={newUrl} name="Url" id="url"
            onChange={({ target }) => setNewUrl(target.value)}/>
        </div>
        <button type="submit" id="submitBtn">Create</button>
      </form>
    </>
  )
}

export default BlogForm