import React from 'react'
import { ActionButton, Icon } from '@fluentui/react'

const AddItemButton = ({ onNewTask }) => {
  return (
    <div className="List__action-button-wrapper">
      <ActionButton className="List__action-button" onClick={onNewTask}>
        <Icon iconName="Add" className="List__action-button-icon" />
        Add a task. Don't type @ to assign it to someone, that won't work.
      </ActionButton>
    </div>
  )
}

export default AddItemButton
