import React, {useMemo, useState} from 'react'
import {css} from 'emotion'
import {createEditor, Node} from 'slate'
import {Slate, Editable, withReact} from 'slate-react'

import {IPageProps} from '../common/types'

const SlateContainerStyle = css`
  border: 2px solid darkgreen;
  margin: 0 auto;
  width: 60%;
  height: 60vh;
`

const Editor = (_props: IPageProps) => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState<Node[]>([
    {
      type: 'paragraph',
      children: [{text: 'A line of text in a paragraph.'}],
    },
  ])
  const handleChange = (value: Node[]) => {
    console.log(value)
    setValue(value)
  }
  return (
    <div className={SlateContainerStyle}>
      <Slate editor={editor} value={value} onChange={handleChange}>
        <Editable />
      </Slate>
    </div>
  )
}

Editor.displayName = 'Editor'

export default Editor
