const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let loginToken

beforeEach(async () => {
  await User.deleteMany({})

  for (const user of helper.initalUsers) {
    const res = await api.post('/api/users').send(user)
  }

  const res = await api.post('/api/login').send({ username: 'bob', password: '123456' })
  loginToken = res.body.token


  await Blog.deleteMany({})
  const blogObjects = helper.initalBlogs.map(blog => new Blog(blog))
  const blogPromiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(blogPromiseArray)
})


test('all blogs are returned and as json format', async () => {
  const res = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

  expect(res.body).toHaveLength(helper.initalBlogs.length)
}, 100000)

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
    .set('Authorization', 'bearer ' + loginToken)
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

  const res = await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + loginToken)
    .send(blogWithNoLike)

  expect(res.body.likes).toBe(0)
})

test('blog with no {title} and {url} property return http code 400', async () => {
  const blogWithNoTitleAndUrl = {
    author: "foo",
    likes: 12
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + loginToken)
    .send(blogWithNoTitleAndUrl)
    .expect(400)
})

test('add user existed will return 400', async () => {
  const newUser = {
    username: "hola",
    name: "hola",
    password: "123456"
  }

  const res = await api
    .post('/api/users')
    .set('Authorization', 'bearer ' + loginToken)
    .send(newUser)
    .expect(400)

  expect(res.body.error).toBe('username must be unique')
})

test('username or password less than 3 will return 400', async () => {
  let newUser = {
    username: "xx",
    name: "xxx",
    password: "123456"
  }
  let res = await api.post('/api/users').send(newUser).expect(400)
  expect(res.body.error).toBe('username and password must at least 3 long')

  newUser = {
    username: "xxxx",
    name: "xxx",
    password: "12"
  }
  res = await api.post('/api/users').send(newUser).expect(400)
  expect(res.body.error).toBe('username and password must at least 3 long')
})

test('add blog but unauthorized will return 401', async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  }
  await api.post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

afterAll(() => {
  mongoose.connection.close()
})
