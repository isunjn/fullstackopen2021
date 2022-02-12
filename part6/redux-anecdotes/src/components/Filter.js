import React from "react"
import { setFilter, clearFilter } from "../reducers/filterReducer"
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value
    if (filter === '') {
      dispatch(clearFilter())
    } else {
      dispatch(setFilter(filter))
    }
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter