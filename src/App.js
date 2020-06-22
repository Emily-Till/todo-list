import React, { useState } from 'react'

import Sidebar from './features/sidebar/Sidebar'
import List from './features/list/List'
import './App.css'

const createListItem = (content = '') => ({
  content,
  completed: false,
  key: String(Math.random()),
})

const createNewListItem = (name) => ({
  link: {
    name,
    key: name + Math.random(),
  },
  items: [createListItem()],
})

const SHOPPING_LIST = createNewListItem('Groceries')
SHOPPING_LIST.items = [
  createListItem('Ketchup'),
  createListItem('Encona'),
  createListItem('Peas'),
  createListItem('Garlic'),
  createListItem('Peanut butter'),
  createListItem('Jam'),
  createListItem('Maggi sauce bags'),
  createListItem('Instant noodles'),
  createListItem('Lanzhou noodles'),
]

const App = () => {
  const [lists, setLists] = useState([SHOPPING_LIST])
  const [selectedListIndex, setSelectedListIndex] = useState(0)
  const selectedList = lists[selectedListIndex]

  const onListSelect = (key) => {
    const newSelectedListItemIndex = lists.findIndex(
      ({ link }) => link.key === key,
    )

    setSelectedListIndex(newSelectedListItemIndex)
  }

  const onCreateNewList = () => {
    setLists([...lists, createNewListItem('New todo list')])
  }

  const updateListItem = (index, newListItem) => {
    const newListItems = [...selectedList.items]
    newListItems.splice(index, 1, newListItem)

    updateList({ items: newListItems })
  }

  const updateList = (newList) => {
    const newLists = [...lists]
    newLists.splice(selectedListIndex, 1, {
      ...selectedList,
      ...newList,
    })

    setLists(newLists)
  }

  const onListNameUpdate = (event) => {
    const value = event.currentTarget.value

    updateList({
      link: {
        ...selectedList.link,
        name: value,
      },
    })
  }

  const onItemSelected = (index) => {
    const newListItem = {
      ...selectedList.items[index],
      completed: true,
    }

    updateListItem(index, newListItem)
  }

  const onItemUpdate = (index, event) => {
    const value = event.currentTarget.value
    const newListItem = {
      ...selectedList.items[index],
      content: value,
    }

    updateListItem(index, newListItem)
  }

  const onItemDrop = (index, key) => {
    const item = selectedList.items.find((item) => item.key === key)
    const itemIndex = selectedList.items.indexOf(item)

    const newListItems = [...selectedList.items]
    newListItems.splice(itemIndex, 1)
    newListItems.splice(index, 0, item)

    updateList({ items: newListItems })
  }

  const onNewTask = () => {
    updateList({ items: [...selectedList.items, createListItem()] })
  }

  const onDeleteTask = (index) => {
    const newListItems = [...selectedList.items]
    newListItems.splice(index, 1)

    updateList({ items: newListItems })
  }

  return (
    <main className="App">
      <div className="App__sidebar-wrapper">
        <Sidebar
          lists={lists}
          selectedListItem={selectedList.link.key}
          onCreateNewList={onCreateNewList}
          onListSelect={onListSelect}
        />
      </div>
      <div className="App__list-wrapper">
        <List
          listName={selectedList.link.name}
          items={selectedList.items}
          onListNameUpdate={onListNameUpdate}
          onItemSelected={onItemSelected}
          onItemUpdate={onItemUpdate}
          onItemDrop={onItemDrop}
          onNewTask={onNewTask}
          onDeleteTask={onDeleteTask}
        />
      </div>
    </main>
  )
}

export default App
