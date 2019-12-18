import React, {useState} from 'react'
import {css} from 'emotion'
import {SearchBox, ISearchBoxStyles} from 'office-ui-fabric-react/lib/SearchBox'
import {PrimaryButton} from 'office-ui-fabric-react/lib/Button'
import {Link} from '@reach/router'
import {useDebounce} from 'use-debounce'

import SearchResults from '../components/SearchResults'
import {IPageProps} from '../common/types'

const SearchBoxContainerStyle = css`
  display: flex;
  justify-content: center;
`

const SearchBoxStyles: ISearchBoxStyles = {
  root: {
    marginBottom: '10px',
    marginLeft: '10px',
    marginRight: '10px',
    minHeight: '2rem',
    width: '50vh',
  },
  field: {
    fontSize: '1.25rem',
  },
}

const Search = (props: IPageProps) => {
  const [input, setInput] = useState('')
  const [word] = useDebounce(input, 500)

  return (
    <>
      <div className={SearchBoxContainerStyle}>
        <SearchBox
          ariaLabel="The search box"
          placeholder="Enter the word to search..."
          styles={SearchBoxStyles}
          onChange={e => setInput(e ? e.target.value : '')}
        />
        <Link to="/edit">
          <PrimaryButton>Add</PrimaryButton>
        </Link>
      </div>

      <SearchResults word={word} />
    </>
  )
}

Search.displayName = 'Search'

export default Search
