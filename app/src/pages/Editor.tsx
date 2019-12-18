import React, {useMemo, useState} from 'react'
import {css} from 'emotion'
import {createEditor, Node} from 'slate'
import {Slate, Editable, withReact} from 'slate-react'
import {useMutation} from '@apollo/react-hooks'
import {PrimaryButton, IButtonStyles} from 'office-ui-fabric-react/lib/Button'
import {Spinner} from 'office-ui-fabric-react/lib/Spinner'
import {TextField} from 'office-ui-fabric-react/lib/TextField'

import {IPageProps, SystemMessage} from '../common/types'
import {CREATE_ITEM, UPDATE_ITEM} from '../gql/mutations'
import MessageBar from '../components/MessageBar'

const EditorContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SlateContainerStyle = css`
  border: 2px solid darkgreen;
  margin: 5px auto;
  width: 60%;
  height: 60vh;
`

const SaveButtonStyles: IButtonStyles = {
  root: {
    width: '50px',
  },
}

const initialMessageBar: SystemMessage = {
  display: false,
  message: '',
  type: 'info',
}

const Editor = (props: IPageProps) => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [content, setContent] = useState<Node[]>(
    (props.location && JSON.parse(props.location.state.description)) || [
      {
        type: 'paragraph',
        children: [{text: 'A line of text in a paragraph.'}],
      },
    ],
  )
  const [word, setWord] = useState('')
  const [messageBar, setMessageBar] = useState<SystemMessage>(initialMessageBar)
  const [createOrUpdateItem, {data, loading}] = useMutation(
    props.word ? UPDATE_ITEM : CREATE_ITEM,
    {
      onError: error => {
        setMessageBar({
          display: true,
          type: 'error',
          message:
            error.graphQLErrors.length > 0
              ? error.graphQLErrors[0].message
              : error.networkError
              ? 'Network error.'
              : '',
        })
        setTimeout(() => setMessageBar(initialMessageBar), 1000)
      },
      onCompleted: data => {
        setMessageBar({
          display: true,
          type: 'success',
          message: props.word
            ? `"${props.word}" has been updated.`
            : `"${data.createItem.word}" has been added to dictionary.`,
        })
        setTimeout(() => setMessageBar(initialMessageBar), 1000)
      },
    },
  )

  const handleWordChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setWord((event.target as any).value)
  }
  const handleContentChange = (value: Node[]) => {
    setContent(value)
  }

  return (
    <>
      <MessageBar display={messageBar.display} type={messageBar.type}>
        {messageBar.message}
      </MessageBar>
      <div className={EditorContainerStyle}>
        {props.word ? (
          <h2>{props.word}</h2>
        ) : (
          <TextField
            placeholder="Input the word..."
            onChange={handleWordChange}
          />
        )}
        <div className={SlateContainerStyle}>
          <Slate editor={editor} value={content} onChange={handleContentChange}>
            <Editable />
          </Slate>
        </div>
        <PrimaryButton
          onClick={() => {
            createOrUpdateItem({
              variables: {
                word: word || props.word,
                description: JSON.stringify(content),
              },
            })
          }}
          styles={SaveButtonStyles}
          disabled={word === '' && !props.word}
        >
          {loading ? <Spinner /> : 'Save'}
        </PrimaryButton>
      </div>
    </>
  )
}

Editor.displayName = 'Editor'

export default Editor
