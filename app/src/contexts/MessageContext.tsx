import React, {useReducer} from 'react'

interface IMessageState {
  display: boolean
  message: string
  type: 'info' | 'error' | 'success'
}

interface IMessageReducer {
  state: IMessageState
  dispatch: React.Dispatch<IMessageAction>
}

export enum MessageAction {
  RESET,
  SET,
}

export interface IMessageAction {
  type: MessageAction
  messageType?: 'info' | 'error' | 'success'
  message?: string
}

interface IMessageProviderProps {
  children: React.ReactNode
}

const InitialMessageState: IMessageState = {
  display: false,
  message: '',
  type: 'info',
}

export const MessageContext = React.createContext<IMessageReducer>({
  state: InitialMessageState,
  dispatch: (undefined as any) as React.Dispatch<IMessageAction>,
})

const messageReducer = (state: IMessageState, action: IMessageAction) => {
  switch (action.type) {
    case MessageAction.RESET:
      return InitialMessageState
    case MessageAction.SET:
      return {
        display: true,
        type: action.messageType!,
        message: action.message!,
      }
  }
}

export const MessageProvider = ({children}: IMessageProviderProps) => {
  const [state, dispatch] = useReducer(messageReducer, InitialMessageState)
  const value = {state, dispatch}
  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  )
}
