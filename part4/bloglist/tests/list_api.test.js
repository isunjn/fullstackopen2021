const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initalBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('all blogs are returned and as json format', async () => {
  const res = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

  expect(res.body).toHaveLength(helper.initalBlogs.length)
})

test('blog object has {id} property defined', async () => {
  const res = await api.get('/api/blogs')

  res.body.every(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  }

  await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initalBlogs.length + 1)

  const urls = blogsAtEnd.map(blog => blog.url)
  expect(urls).toContain('https://reactpatterns.com/')
})

test('blog with no {like} property should default to 0', async () => {
  const blogWithNoLike = {
    title: "foo",
    author: "foo",
    url: "https://example.com",
  }

  const res =  await api.post('/api/blogs').send(blogWithNoLike)
  expect(res.body.likes).toBe(0)
})

test('blog with no {title} and {url} property return http code 400', async () => {
  const blogWithNoTitleAndUrl = {
    author: "foo",
    likes: 12
  }

  await api.post('/api/blogs').send(blogWithNoTitleAndUrl).expect(400)
})


afterAll(() => {
  mongoose.connection.close()
})
