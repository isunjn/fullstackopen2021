import React from "react"
import { setFilter } from "../reducers/filterReducer"
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

const Filter = (props) => {
/*   const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value
    dispatch(setFilter(filter))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  ) */

  const handleChange = (event) => {
    const filter = event.target.value
    props.setFilter(filter)
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


const mapDispatchToProps = {
  setFilter
}

const ConnectFilter = connect(
  null,
  mapDispatchToProps
)(Filter)

export default ConnectFilter