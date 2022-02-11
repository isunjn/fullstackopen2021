import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('create new blog called correctly', () => {
    const mockCreate = jest.fn()

    const component = render(
      <BlogForm createNewBlog={mockCreate} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const submitBtn = component.container.querySelector('#submitBtn')

    fireEvent.change(title, {
      target: { value: 'test title' }
    })

    fireEvent.change(author, {
      target: { value: 'test author' }
    })

    fireEvent.change(url, {
      target: { value: 'test url' }
    })

    fireEvent.click(submitBtn)

    expect(mockCreate.mock.calls).toHaveLength(1)
  })
})