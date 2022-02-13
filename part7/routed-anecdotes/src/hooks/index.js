import { useState } from "react"

export const useField = (type, name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = () => {
    setValue('')
    console.log('reset invoke')
  }
  
  return {
    type, name, value, onChange, onReset
  }
}

