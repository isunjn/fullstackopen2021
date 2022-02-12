import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async (anecdote) => {
  const newObj = {
    content: anecdote,
    id: getId(),
    votes: 0
  }
  const res = await axios.post(baseUrl, newObj)
  return res.data
}

const update = async (anecdote) => {
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return res.data
}


const anecdoteService =  {
  getAll, createNew, update
}

export default anecdoteService