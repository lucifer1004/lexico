import React, {useState} from 'react'
import {useQuery} from '@apollo/react-hooks'
import {css} from 'emotion'
import {
  FocusZone,
  FocusZoneDirection,
} from 'office-ui-fabric-react/lib/FocusZone'
import {List} from 'office-ui-fabric-react/lib/List'
import {produce} from 'immer'

import SearchResultItem from './SearchResultItem'
import {ITEMS} from '../gql/queries'
import {Item} from '../common/types'

interface ISearchResultsProps {
  word: string
}

type SearchResult = {
  itemCount: number
  items: Item[]
}

const SearchResultsStyle = css`
  margin: 0 20%;
  overflow: auto;
  height: 70vh;

  @media (max-width: 960px) {
    margin: 0 5%;
  }
`

const SearchResults = ({word}: ISearchResultsProps) => {
  const {loading, error, data, fetchMore} = useQuery(ITEMS, {
    variables: {word, offset: 0},
  })

  const renderCell = (item: Item | undefined) =>
    item ? (
      <div>
        <SearchResultItem item={item} />
      </div>
    ) : null

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    let element = e.target as HTMLDivElement

    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight,
      ) < 1 &&
      data.items.length < data.itemCount
    ) {
      fetchMore({
        variables: {
          offset: data.items.length,
        },
        updateQuery: (prev: SearchResult, {fetchMoreResult}) =>
          produce(prev, draft => {
            if (fetchMoreResult) draft.items.push(...fetchMoreResult.items)
          }),
      })
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div
      className={SearchResultsStyle}
      data-is-scrollable
      onScroll={handleScroll}
    >
      {data.itemCount === 0
        ? 'Not found.'
        : `Showing 1-${data.items.length} of ${data.itemCount}.`}
      <FocusZone direction={FocusZoneDirection.vertical}>
        <List
          items={data.items}
          renderedWindowsAhead={2}
          onRenderCell={renderCell}
        />
      </FocusZone>
      {data.items.length < data.itemCount ? 'Scroll to load more...' : null}
    </div>
  )
}

SearchResults.displayName = 'SearchResults'

export default SearchResults
