import React, { useState } from 'react'

import Notification from './Notification'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      login({ username, password })
      setUsername('')
      setPassword('')
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

  return (
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
}

export default LoginForm