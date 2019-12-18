import React from 'react'
import {css} from 'emotion'
import {
  MessageBar as Bar,
  MessageBarType,
  IMessageBarStyles,
} from 'office-ui-fabric-react/lib/MessageBar'

interface IMessageBarProps {
  display?: boolean
  children?: React.ReactNode
  type?: 'info' | 'error' | 'success'
}

const MessageBarContainerStyle = css`
  position: fixed;
  top: 0;
  width: 30vw;
  left: 35vw;
  margin: 0 auto;
`

const MessageBar = ({
  display = false,
  children,
  type = 'info',
}: IMessageBarProps) => {
  return display ? (
    <div className={MessageBarContainerStyle}>
      <Bar messageBarType={MessageBarType[type]}>{children}</Bar>
    </div>
  ) : null
}

MessageBar.displayName = 'MessageBar'

export default MessageBar
