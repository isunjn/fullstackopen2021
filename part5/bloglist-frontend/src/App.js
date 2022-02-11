import React, { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogView from './components/BlogView'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedBlogappUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedBlogappUserJSON) {
      const user = JSON.parse(loggedBlogappUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (credentials) => {
    const user = await loginService.login(credentials)

    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    setUser(user)
  }

  const logout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.removeToken()
    setUser(null)
  }

  return (
    <div>
      {user === null && <LoginForm login={login} />}
      {user !== null && <BlogView name={user.name} logout={logout} />}
    </div>
  )
}

export default App