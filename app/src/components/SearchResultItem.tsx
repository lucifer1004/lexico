import React from 'react'
import {Item} from '../common/types'

interface ISearchResultItemProps {
  item: Item
}

const SearchResultItem = ({item}: ISearchResultItemProps) => (
  <div>
    <h2>{item.word}</h2>
    <p>{item.description}</p>
  </div>
)

SearchResultItem.displayName = 'SearchResultItem'

export default SearchResultItem
