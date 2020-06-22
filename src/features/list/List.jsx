import React from 'react'
import { Toggle } from '@fluentui/react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import './List.css'

const List = ({ items, onItemDrop, onItemSelected, onItemUpdate }) => {
  return (
    <DragDropContext
      onDragEnd={({ destination, draggableId }) => {
        if (destination) {
          onItemDrop(destination.index, draggableId)
        }
      }}
    >
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            className="List"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map((item, index) => (
              <Draggable key={item.key} draggableId={item.key} index={index}>
                {(provided, snapshot) => (
                  <div
                    className="List__item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    // style={getItemStyle(
                    //   snapshot.isDragging,
                    //   provided.draggableProps.style,
                    // )}
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
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default List
