import React, {useMemo, useState, useContext} from 'react'
import {css} from 'emotion'
import {createEditor, Node} from 'slate'
import {Slate, Editable, withReact} from 'slate-react'
import {useMutation} from '@apollo/react-hooks'
import {PrimaryButton, IButtonStyles} from 'office-ui-fabric-react/lib/Button'
import {Spinner} from 'office-ui-fabric-react/lib/Spinner'
import {TextField} from 'office-ui-fabric-react/lib/TextField'

import {IPageProps} from '../common/types'
import {CREATE_ITEM, UPDATE_ITEM} from '../gql/mutations'
import {ITEMS} from '../gql/queries'
import {MessageContext, MessageAction} from '../contexts/MessageContext'
import {handleApolloError} from '../utils/gql'

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

const Editor = (props: IPageProps) => {
  const {dispatch} = useContext(MessageContext)
  const editor = useMemo(() => withReact(createEditor()), [])
  const [content, setContent] = useState<Node[]>(
    (props.location &&
      props.location.state &&
      props.location.state.description &&
      JSON.parse(props.location.state.description)) || [
      {
        type: 'paragraph',
        children: [{text: 'A line of text in a paragraph.'}],
      },
    ],
  )
  const [word, setWord] = useState('')
  const [createOrUpdateItem, {loading}] = useMutation(
    props.word ? UPDATE_ITEM : CREATE_ITEM,
    {
      onError: handleApolloError(dispatch),
      onCompleted: data => {
        dispatch({
          type: MessageAction.SET,
          message: props.word
            ? `"${props.word}" has been updated.`
            : `"${data.createItem.word}" has been added to dictionary.`,
          messageType: 'success',
        })
        setTimeout(() => dispatch({type: MessageAction.RESET}), 1000)
      },
      refetchQueries: [
        {
          query: ITEMS,
          variables: {
            word: '',
            offset: 0,
          },
        },
      ],
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
