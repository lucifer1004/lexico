import React, {useContext, useEffect} from 'react'
import {Router} from '@reach/router'

import Layout from './layouts/Layout'
import Search from './pages/Search'
import Editor from './pages/Editor'
import {MessageContext} from './contexts/MessageContext'
import MessageBar from './components/MessageBar'

const App = () => {
  const {state} = useContext(MessageContext)

  return (
    <Layout>
      <MessageBar display={state.display} type={state.type}>
        {state.message}
      </MessageBar>
      <Router>
        <Search path="/" />
        <Editor path="/edit" />
        <Editor path="/edit/:word" />
      </Router>
    </Layout>
  )
}

export default App
