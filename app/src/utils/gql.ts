import {ApolloError} from 'apollo-boost'
import React from 'react'

import {IMessageAction, MessageAction} from '../contexts/MessageContext'

export const handleApolloError = (dispatch: React.Dispatch<IMessageAction>) => (
  error: ApolloError,
) => {
  dispatch({
    type: MessageAction.SET,
    message:
      error.graphQLErrors && error.graphQLErrors.length > 0
        ? error.graphQLErrors[0].message
        : error.networkError
        ? 'Network error.'
        : '',
    messageType: 'error',
  })
  setTimeout(() => dispatch({type: MessageAction.RESET}), 1000)
}
