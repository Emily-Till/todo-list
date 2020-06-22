import React from 'react'
import { Toggle, IconButton } from '@fluentui/react'

const ListItem = ({
  index,
  provided,
  item,
  onItemSelected,
  onItemUpdate,
  onDeleteTask,
}) => {
  return (
    <div
      className="List__item"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Toggle
        className="List__item-toggle"
        ariaLabel="completed"
        defaultChecked={item.completed}
        onClick={() => onItemSelected(index)}
      ></Toggle>
      <input
        type="text"
        className="List__item-input"
        value={item.content}
        onChange={(event) => onItemUpdate(index, event)}
      />
      <IconButton
        iconProps={{ iconName: 'Delete' }}
        ariaLabel="Delete item"
        onClick={() => onDeleteTask(index)}
      />
    </div>
  )
}

export default ListItem
