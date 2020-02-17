import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Table from './components/Table'

function App() {
  const [ list, setList ] = useState([])

  useEffect(() => {
    ( async function () {
      let cachedListJSON = window.localStorage.getItem("list")
      let cachedList = await JSON.parse(cachedListJSON)
      cachedList ? setList(cachedList) : setList([])
    })()
  }, [])
  return (
    <>
      <Form list={list} setList={setList} />
      <Table list={list} setList={setList} />
    </>
  )
}

export default App
