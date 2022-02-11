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

  const justTitle = () => (
    <>
      {blog.title}
      <button onClick={toggleDetail} className="viewBtn">view</button>
    </>
  )

  const withDetail = () => (
    <>
      <p>{blog.title}<button onClick={toggleDetail}>hide</button></p>
      <p className='url'>{blog.url}</p>
      <p className='likes'>{blog.likes}<button onClick={addLike} className='likeBtn'>like</button></p>
      <p>{blog.author}</p>
      <button onClick={remove}>remove</button>
    </>
  )

  return (
    <div style={blogStyle} className="oneBlog">
      {!showDetail && justTitle()}
      {showDetail && withDetail()}
    </div>
  )
}

export default Blog