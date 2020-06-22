import React from 'react'
import { Nav } from '@fluentui/react'

const ADD_NEW_LIST_KEY = 'addLink'

const Sidebar = ({
  lists,
  onCreateNewList,
  onListSelect,
  selectedListItem,
}) => {
  const listItems = lists.map(({ link, items }) => ({
    ...link,
    name: `${link.name} - ${items.length}`,
  }))

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
            ...listItems,
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
