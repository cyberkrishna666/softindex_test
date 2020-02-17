import React, { useState } from 'react'
import Item from './Item'

function Table({ list, setList }) {
  const [ ageSort, setAgeSort ] = useState(true)
  const [ genderSort, setGenderSort ] = useState(true)
  const [ phoneSort, setPhoneSort ] = useState(true)
  const [ lastNameSort, setLastNameSort ] = useState(true)
  const [ firstNameSort, setFirstNameSort ] = useState(true)
  const [ selectedItems, setSelectedItems ] = useState([])

  const handleNumericSort = (heading, setHeading, type) => {
    setAgeSort(true)
    setGenderSort(true)
    setPhoneSort(true)
    setLastNameSort(true)
    setFirstNameSort(true)
    setHeading(!heading)

    heading ?
    setList(list.sort( (firstEl, secondEl) => firstEl[type] - secondEl[type] ))
    :
    setList(list.sort( (firstEl, secondEl) => secondEl[type] - firstEl[type] ))
  }

  const handleAlphabeticalSort = (heading, setHeading, type) => {
    setAgeSort(true)
    setGenderSort(true)
    setPhoneSort(true)
    setLastNameSort(true)
    setFirstNameSort(true)
    setHeading(!heading)

    heading ?
    setList(list.sort( (firstEl, secondEl ) => firstEl[type].toUpperCase() > secondEl[type].toUpperCase() ? 1 : firstEl[type].toUpperCase() < secondEl[type].toUpperCase() ? -1 : 0 ))
    :
    setList(list.sort( (firstEl, secondEl ) => firstEl[type].toUpperCase() < secondEl[type].toUpperCase() ? 1 : firstEl[type].toUpperCase() > secondEl[type].toUpperCase() ? -1 : 0 ))
  }

  const handleDelete = () => {
    let filteredArray = list
    for ( let i = 0; i < selectedItems.length; i++ ) {
      filteredArray = filteredArray.filter( el => el.id != selectedItems[i])
    }

    setList(filteredArray)
    setSelectedItems([])
    window.localStorage.setItem("list", JSON.stringify(filteredArray))
  }

  const mapItems = () => (
    list.map( content => (
      <Item
      key={content.id}
      content={content}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems} />
    ))
  )
  return (
    <>
    <table>
      <thead>
        <tr>
          <td>
            { selectedItems.length ? <button onClick={handleDelete}>Delete</button> : null }
          </td>
        <td>Name
        <button
          onClick={
          () => handleAlphabeticalSort(firstNameSort, setFirstNameSort, 'firstName')
          }>
          { firstNameSort ? '▴' : '▾' }
          </button>
        </td>
        <td>Last name
          <button
          onClick={
          () => handleAlphabeticalSort(lastNameSort, setLastNameSort, 'lastName')
          }>
          { lastNameSort ? '▴' : '▾' }
          </button>
        </td>
        <td>Phone
          <button onClick={() => handleNumericSort(phoneSort, setPhoneSort, 'phoneNumber')}> { phoneSort ? '▴' : '▾' } </button>
        </td>
        <td>Gender
          <button onClick={() => handleNumericSort(genderSort, setGenderSort, 'gender')}> { genderSort ? '▴' : '▾' } </button>
        </td>
        <td>Age
          <button onClick={() => handleNumericSort(ageSort, setAgeSort, 'age')}> { ageSort ? '▴' : '▾' } </button>
        </td>
        </tr>
      </thead>
      <tbody>
        {mapItems()}
      </tbody>
    </table>
    </>
  )
}

export default Table