import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'testing',
    author: 'tester',
    url: 'test',
    likes: 5
  }

  const mockUpdate = jest.fn()
  const mockDelete = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlog={mockUpdate} deleteBlog={mockDelete} />
    )
  })

  test('just render title by default', () => {
    expect(component.container).toHaveTextContent('testing')
  })

  test('render url and likes after click view', () => {
    const viewBtn = component.container.querySelector('.viewBtn')
    fireEvent.click(viewBtn)

    expect(component.container.querySelector('.url')).not.toBe(null)
    expect(component.container.querySelector('.likes')).not.toBe(null)
  })

  test('click like button will call likes twice', () => {
    const viewBtn = component.container.querySelector('.viewBtn')
    fireEvent.click(viewBtn)

    const likeBtn = component.container.querySelector('.likeBtn')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    expect(mockUpdate.mock.calls).toHaveLength(2)
  })
})
