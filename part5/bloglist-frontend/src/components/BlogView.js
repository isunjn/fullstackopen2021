import React, { useState, useEffect, useRef } from 'react'

import Notification from './Notification'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

import blogService from '../services/blogs'

const BlogView = ({ name, logout }) => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const createNewBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      setMessage({
        type: 'notify',
        content: `A new blog added: ${savedBlog.title} by ${savedBlog.author}`
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage({
        type: 'error',
        content: `${error.response.data.error}`
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (newBlog) => {
    try {
      await blogService.update(newBlog)
      setBlogs(blogs.map(blog => blog.id === newBlog.id ? newBlog : blog))
    } catch(error) {
      setMessage({
        type: 'error',
        content: `${error.response.data.error}`
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteOne(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch(error) {
      setMessage({
        type: 'error',
        content: `${error.response.data.error}`
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      <p>{name} logged in <button onClick={logout}>logout</button></p>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable>
      <Notification message={message}/>
      <h2>blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
      )}
    </>
  )
}

export default BlogView