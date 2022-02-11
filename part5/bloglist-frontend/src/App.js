import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedBlogappUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedBlogappUserJSON) {
      const user = JSON.parse(loggedBlogappUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage({
        type: 'error',
        content: `${error.response.data.error}`
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.removeToken()
    setUser(null)
  }

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      setMessage({
        type: 'notify',
        content: `A new blog added: ${savedBlog.title} by ${savedBlog.author}`
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    } catch (error) {
      setMessage({
        type: 'error',
        content: `${error.response.data.error}`
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }

  const loginForm = () => (
    <>
    <h2>Log in to application</h2>
    <Notification message={message}/>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
    </>
  )

  const blogView = () => (
    <>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <hr/>
      <h2>Create New</h2>
      <form onSubmit={handleCreateNewBlog}>
        <div>
          Title:
          <input type="text" value={newTitle} name="Title"
            onChange={({target}) => setNewTitle(target.value)}/>
        </div>
        <div>
          Author:
          <input type="text" value={newAuthor} name="Author"
            onChange={({target}) => setNewAuthor(target.value)}/>
        </div>
        <div>
          URL:
          <input type="text" value={newUrl} name="Url"
            onChange={({target}) => setNewUrl(target.value)}/>
       </div>
       <button type="submit">Create</button>
      </form>
      <Notification message={message}/>
      <hr/>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </>
  )


  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogView()}
    </div>
  )
}

export default App