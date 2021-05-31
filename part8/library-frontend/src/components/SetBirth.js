import React, { useState } from 'react'
import { useMutation } from "@apollo/client"
import Select from 'react-select'

import { SET_BIRTH, ALL_AUTHORS } from "../queries"

const SetBirth = ({ authors }) => {
  const [year, setYear] = useState("")
  const [selectedOption, setSelectedOption] = useState(null);

  const [setBirth] = useMutation(SET_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(JSON.stringify(error))
    }
  })

  const options = authors.map((author) => ({ value: author.name, label: author.name }))

  const handleSubmit = (e) => {
    e.preventDefault()

    if (selectedOption) {
      setBirth({
        variables: {
          name: selectedOption.value,
          setBornTo: parseInt(year)
        }
      })
    }

    setYear("")
    setSelectedOption(null)
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <Select options={options} defaultValue={selectedOption} onChange={setSelectedOption} value={selectedOption} />
        <input type="text" value={year} onChange={({ target }) => { setYear(target.value) }} />
        <input type="submit" value="Change" />
      </form>
    </div>
  )
}

export default SetBirth
