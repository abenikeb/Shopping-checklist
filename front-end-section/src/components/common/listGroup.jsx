import React from 'react'
const ListGroup = (props) => {
  const {
    items,
    onItemSelect,
    selectedItems,
    textProperty,
    valueProperty,
  } = props
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          className={
            selectedItems === item
              ? 'list-group-item active'
              : 'list-group-item'
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  )
}

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
}
export default ListGroup
