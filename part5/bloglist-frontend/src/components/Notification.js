import React from 'react'

const Notification = ({ message }) => {
  if (message) {
    return (
      <div className={message.type}>{message.content}</div>
    )
  }
}

export default Notification