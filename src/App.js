import React, { useState } from 'react'

import Sidebar from './features/sidebar/Sidebar'
import List from './features/list/List'
import './App.css'

const createListItem = () => ({
  content: 'asdasdas',
  completed: false,
  key: String(Math.random()),
})

const createNewListItem = (name) => ({
  link: {
    name,
    key: name + Math.random(),
  },
  items: [createListItem(), createListItem()],
})

const App = () => {
  const [lists, setLists] = useState([createNewListItem('Todo')])
  const [selectedListIndex, setSelectedListIndex] = useState(0)
  const selectedList = lists[selectedListIndex]

  function onListSelect(key) {
    const newSelectedListItemIndex = lists.findIndex(
      ({ link }) => link.key === key,
    )

    setSelectedListIndex(newSelectedListItemIndex)
  }

  function onCreateNewList() {
    setLists([...lists, createNewListItem('New todo list')])
  }

  function updateListItem(index, newListItem) {
    const newListItems = [...selectedList.items]
    newListItems.splice(index, 1, newListItem)

    updateListItems(newListItems)
  }

  function updateListItems(newListItems) {
    const newLists = [...lists]
    newLists.splice(selectedListIndex, 1, {
      ...selectedList,
      items: newListItems,
    })

    setLists(newLists)
  }

  return (
    <main className="App">
      <div className="App__sidebar-wrapper">
        <Sidebar
          lists={lists.map(({ link }) => link)}
          selectedListItem={selectedList.link.key}
          onCreateNewList={onCreateNewList}
          onListSelect={onListSelect}
        />
      </div>
      <div className="App__list-wrapper">
        <List
          items={selectedList.items}
          onItemSelected={(index) => {
            const newListItem = {
              ...selectedList.items[index],
              completed: true,
            }

            updateListItem(index, newListItem)
          }}
          onItemUpdate={(index, event) => {
            const value = event.currentTarget.value
            const newListItem = {
              ...selectedList.items[index],
              content: value,
            }

            updateListItem(index, newListItem)
          }}
          onItemDrop={(index, key) => {
            const item = selectedList.items.find((item) => item.key === key)
            const itemIndex = selectedList.items.indexOf(item)

            const newListItems = [...selectedList.items]
            newListItems.splice(itemIndex, 1)
            newListItems.splice(index, 0, item)

            updateListItems(newListItems)
          }}
        />
      </div>
    </main>
  )
}

export default App
