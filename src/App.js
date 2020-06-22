import React, { useState } from 'react'

import Sidebar from './features/sidebar/Sidebar'
import './App.css'

const createNewListItem = (name) => ({
  link: {
    name,
    key: name,
  },
  items: [],
})

const App = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [lists, setLists] = useState([createNewListItem('Todo')])
  const selectedListItem = lists[selectedItemIndex].link.key

  function onListSelect(key) {
    const selectedListItemIndex = lists.indexOf((list) => list.link.key === key)
    setSelectedItemIndex(selectedListItemIndex)
  }

  function onCreateNewList() {
    setLists([...lists, createNewListItem('New todo list')])
  }

  return (
    <main className="App">
      <Sidebar
        lists={lists.map(({ link }) => link)}
        selectedListItem={selectedListItem}
        onCreateNewList={onCreateNewList}
        onListSelect={onListSelect}
      />
    </main>
  )
}

export default App
