import {gql} from 'apollo-boost'

export const CREATE_ITEM = gql`
  mutation CreateItem($word: String, $description: String) {
    createItem(word: $word, description: $description) {
      id
      word
      description
      insertedAt
      updatedAt
    }
  }
`

export const UPDATE_ITEM = gql`
  mutation UpdateItem($word: String, $description: String) {
    updateItem(word: $word, description: $description) {
      id
      word
      description
      insertedAt
      updatedAt
    }
  }
`

export const DELETE_ITEM = gql`
  mutation DeleteItem($word: String) {
    deleteItem(word: $word) {
      id
      word
      description
      insertedAt
      updatedAt
    }
  }
`
