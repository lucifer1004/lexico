import React from 'react'
import {css} from 'emotion'
import {Link} from '@reach/router'
import {Node} from 'slate'

import {Item} from '../common/types'

interface ISearchResultItemProps {
  item: Item
}

const ItemDescriptionStyle = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const serialize = (value: Node[]) => {
  return value.map(n => Node.text(n)).join('\n')
}

const SearchResultItem = ({item}: ISearchResultItemProps) => {
  return (
    <div>
      <Link to={`/edit/${item.word}`} state={item}>
        <h2>{item.word}</h2>
      </Link>
      <p className={ItemDescriptionStyle}>
        {serialize(JSON.parse(item.description))}
      </p>
    </div>
  )
}

SearchResultItem.displayName = 'SearchResultItem'

export default SearchResultItem
