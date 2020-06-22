import React, { useState } from 'react'
import { Nav } from '@fluentui/react'

const ADD_NEW_LIST_KEY = 'addLink'

const Sidebar = ({
  lists,
  onCreateNewList,
  onListSelect,
  selectedListItem,
}) => {
  function onLinkClick(_event, { key }) {
    if (key === ADD_NEW_LIST_KEY) {
      onCreateNewList()
    } else {
      onListSelect(key)
    }
  }

  return (
    <Nav
      onLinkClick={onLinkClick}
      selectedKey={selectedListItem}
      groups={[
        {
          links: [
            ...lists,
            {
              icon: 'Add',
              name: 'Add new list',
              key: ADD_NEW_LIST_KEY,
            },
          ],
        },
      ]}
    />
  )
}

export default Sidebar
