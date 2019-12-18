import React from 'react'
import {Router} from '@reach/router'

import Layout from './layouts/Layout'
import Search from './pages/Search'
import Editor from './pages/Editor'

const App = () => {
  return (
    <Layout>
      <Router>
        <Search path="/" />
        <Editor path="/edit" />
        <Editor path="/edit/:word" />
      </Router>
    </Layout>
  )
}

export default App
