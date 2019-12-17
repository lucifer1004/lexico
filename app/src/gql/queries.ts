import {gql} from 'apollo-boost'

export const ITEMS = gql`
  query Items($word: String, $offset: Int) {
    itemCount(word: $word)
    items(word: $word, offset: $offset) {
      id
      word
      description
    }
  }
`
