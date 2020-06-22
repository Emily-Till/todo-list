import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import AddItemButton from './AddItemButton'
import ListItem from './ListItem'
import './List.css'

const List = ({
  listName,
  onListNameUpdate,
  items,
  onItemDrop,
  onItemSelected,
  onItemUpdate,
  onNewTask,
  onDeleteTask,
}) => {
  const onDragEnd = ({ destination, draggableId }) => {
    if (destination) {
      onItemDrop(destination.index, draggableId)
    }
  }

  const ListItems = items.map((item, index) => (
    <Draggable key={item.key} draggableId={item.key} index={index}>
      {(provided) => (
        <ListItem
          index={index}
          item={item}
          provided={provided}
          onItemSelected={onItemSelected}
          onItemUpdate={onItemUpdate}
          onDeleteTask={onDeleteTask}
        />
      )}
    </Draggable>
  ))

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              className="List"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <input
                className="List__name"
                type="text"
                value={listName}
                onChange={onListNameUpdate}
              />
              {ListItems}
              {provided.placeholder}
              <AddItemButton onNewTask={onNewTask} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default List
