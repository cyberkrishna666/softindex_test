import React from 'react'

function Item({ content, selectedItems, setSelectedItems }) {

  const handleSelect = ({ target }) => {
    target.checked ?
      setSelectedItems(selectedItems.concat(content.id))
      :
      setSelectedItems(selectedItems.filter( el => el != content.id))
  }

  return (
    <tr>
        <td><input type="checkbox" onChange={handleSelect} /></td>
        <td>{content.firstName}</td>
        <td>{content.lastName}</td>
        <td>{content.phoneNumber}</td>
        <td>{content.gender? 'male' : 'female'}</td>
        <td>{content.age}</td>
    </tr>
  )
}

export default Item