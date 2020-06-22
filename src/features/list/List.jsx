import React from 'react'
import { Toggle, ActionButton, IconButton, Icon } from '@fluentui/react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

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
  return (
    <>
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
              <input
                className="List__name"
                type="text"
                value={listName}
                onChange={onListNameUpdate}
              />
              {items.map((item, index) => (
                <Draggable key={item.key} draggableId={item.key} index={index}>
                  {(provided) => (
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <div className="List__action-button-wrapper">
                <ActionButton
                  className="List__action-button"
                  onClick={onNewTask}
                >
                  <Icon iconName="Add" className="List__action-button-icon" />
                  Add a task. Don't type @ to assign it to someone, that won't
                  work.
                </ActionButton>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default List
