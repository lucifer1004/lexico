import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'
import {initializeIcons} from 'office-ui-fabric-react/lib/Icons'

import './index.css'
import App from './App'
import {MessageProvider} from './contexts/MessageContext'

const client = new ApolloClient({
  uri: 'http://localhost:4000/api',
})

initializeIcons(/* optional base url */)

ReactDOM.render(
  <ApolloProvider client={client}>
    <MessageProvider>
      <App />
    </MessageProvider>
  </ApolloProvider>,
  document.getElementById('root'),
)
