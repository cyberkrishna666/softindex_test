import React, { useState } from 'react'

function Form({ list, setList }) {
  const initialFieldState = { value: '', invalid: false, error: '' }
  const required_msg = 'This field is required'
  const [ firstName, setFirstName ] = useState(initialFieldState)
  const [ lastName, setLastName ] = useState(initialFieldState)
  const [ phoneNumber, setPhoneNumber ] = useState(initialFieldState)
  const [ gender, setGender ] = useState(initialFieldState)
  const [ age, setAge ] = useState(initialFieldState)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!firstName.value.trim()) {
      setFirstName({...firstName, invalid: true, error: required_msg})
      
      setTimeout(() => setFirstName({...firstName, invalid: true, error: ''}), 1500)
      return;
    }
    if (!lastName.value.trim()) {
      setLastName({...lastName, invalid: true, error: required_msg})
      setTimeout(() => setLastName({...lastName, invalid: true, error: ''}), 1500)
      return;
    }
    if (!phoneNumber.value.trim()) {
      setPhoneNumber({...phoneNumber, invalid: true, error: required_msg})
      setTimeout(() => setPhoneNumber({...phoneNumber, invalid: true, error: ''}), 1500)
      return;
    }
    if (!gender.value) {
      setGender({...gender, invalid: true, error: required_msg})
      setTimeout(() => setGender({...gender, invalid: true, error: ''}), 1500)
      return;
    }
    if (!age.value.trim()) {
      setAge({...age, invalid: true, error: required_msg})
      setTimeout(() => setAge({...age, invalid: true, error: ''}), 1500)
      return;
    } else if (!(age.value > 0 && age.value < 151)) {
      setAge({...age, invalid: true, error: 'Age must be greater than 0 and less than 150'})
      setTimeout(() => setAge({...age, invalid: true, error: ''}), 2500)
      return;
    }

    const newItem = {
      id: list.length + Number(new Date()).toString(16),
      firstName: firstName.value,
      lastName: lastName.value,
      phoneNumber: phoneNumber.value,
      gender: gender.value == "male" ? true : false,
      age: Number(age.value),
    }
    
    setList(list.concat(newItem))
    window.localStorage.setItem("list", JSON.stringify(list.concat(newItem)))

    setFirstName(initialFieldState)
    setLastName(initialFieldState)
    setPhoneNumber(initialFieldState)
    setGender(initialFieldState)
    setAge(initialFieldState)
  }

  const handleTextInput = ({ target }, setField) => {
    const restrictedChars = /[0-9\s]/gi
    if ( !restrictedChars.test(target.value) ) {
      setField({value: target.value, error: '' })
    } 
  }

  const handlePhoneNumber = ({ target }) => {
    const restrictedChars = /[^0-9\s+]/gi
    if ( !restrictedChars.test(target.value)) {
      setPhoneNumber({ value: target.value, error: '' })
    } 
  }

  return (
    <form>
      <div className="field">
        <label htmlFor="firstName">First name:</label>
        <input
        type="text"
        name="firstName"
        value={firstName.value}
        maxLength="15"
        className={ firstName.invalid ? 'error_input' : null }
        onChange={(event) => handleTextInput(event, setFirstName)} />
        { firstName.error ? <div className="error">{firstName.error}</div> : null }
      </div>

      <div className="field">
        <label htmlFor="lastName">Last name:</label>
        <input
        type="text"
        name="lastName"
        value={lastName.value}
        maxLength="15"
        className={ lastName.invalid ? 'error_input' : null }
        onChange={(event) => handleTextInput(event, setLastName)} />
        { lastName.error ? <div className="error">{lastName.error}</div> : null }
      </div>

      <div className="field">
        <label htmlFor="phoneNumber">Phone:</label>
        <input
        type="tel"
        name="phoneNumber"
        maxLength="14"
        value={phoneNumber.value}
        className={ phoneNumber.invalid ? 'error_input' : null }
        onChange={handlePhoneNumber} />
        { phoneNumber.error ? <div className="error">{phoneNumber.error}</div> : null }
      </div>

      <div className="two_fields">
      <div className="field">
        <label htmlFor="gender">Gender:</label>
        <select name="gender"
        value={gender.value}
        onChange={({ target }) => setGender({ value: target.value, error: '' })}
        className={ gender.invalid ? 'error_input' : null }
        >
          <option defaultValue value=''>
            Select
          </option>
          <option value="male">
            Male
          </option>
          <option value="female">
            Female
          </option>
        </select>
        { gender.error ? <div className="error">{gender.error}</div> : null }
      </div>

      <div className="field">
        <label htmlFor="age">Age:</label>
        <input
        type="number"
        name="age"
        value={age.value}
        min="1"
        max="130"
        maxLength="3"
        required
        className={ age.invalid ? 'error_input' : null }
        onChange={({ target }) => setAge({value: target.value, error: '' })} />
        { age.error ? <div className="error">{age.error}</div> : null }
      </div>
      </div>

      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default Form