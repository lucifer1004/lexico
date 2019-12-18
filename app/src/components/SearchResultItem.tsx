import React, {useContext} from 'react'
import {css} from 'emotion'
import {Link} from '@reach/router'
import {Node} from 'slate'
import {useMutation} from '@apollo/react-hooks'

import {Item} from '../common/types'
import {MessageContext, MessageAction} from '../contexts/MessageContext'
import {DELETE_ITEM} from '../gql/mutations'
import {ITEMS} from '../gql/queries'
import {handleApolloError} from '../utils/gql'

interface ISearchResultItemProps {
  item: Item
}

const ItemDescriptionStyle = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const serialize = (value: Node[]) => value.map(n => Node.string(n)).join('\n')

const SearchResultItem = ({item}: ISearchResultItemProps) => {
  const {dispatch} = useContext(MessageContext)

  const [deleteItem] = useMutation(DELETE_ITEM, {
    variables: {
      word: item.word,
    },
    onCompleted: () => {
      dispatch({
        type: MessageAction.SET,
        message: `"${item.word}" has been deleted.`,
        messageType: 'success',
      })
      setTimeout(() => dispatch({type: MessageAction.RESET}), 1000)
    },
    onError: handleApolloError(dispatch),
    refetchQueries: [
      {
        query: ITEMS,
        variables: {
          word: '',
          offset: 0,
        },
      },
    ],
  })

  return (
    <div>
      <Link to={`/edit/${item.word}`} state={item}>
        <h2>{item.word}</h2>
      </Link>
      <p className={ItemDescriptionStyle}>
        {serialize(JSON.parse(item.description))}
      </p>
      <button onClick={() => deleteItem()}>delete</button>
    </div>
  )
}

SearchResultItem.displayName = 'SearchResultItem'

export default SearchResultItem
