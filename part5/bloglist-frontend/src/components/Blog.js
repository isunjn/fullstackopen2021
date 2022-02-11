import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetail = () => {
    setShowDetail(!showDetail)
  }

  const justTitle = () => (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleDetail}>view</button>
    </div>
  )

  const addLike = () => {
    const  newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlog(newBlog)
  }

  const remove = () => {
    console.log('>>>>>>>>>> id', blog.id)
    deleteBlog(blog.id)
  }

  const withDetail = () => (
    <div style={blogStyle}>
      <p>{blog.title}<button onClick={toggleDetail}>hide</button></p>
      <p>{blog.url}</p>
      <p>{blog.likes}<button onClick={addLike}>like</button></p>
      <p>{blog.author}</p>
      <button onClick={remove}>remove</button>
    </div>
  )

  return (
    <>
      {!showDetail && justTitle()}
      {showDetail && withDetail()}
    </>
  )
}

export default Blog