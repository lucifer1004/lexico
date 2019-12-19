import {ITEMS} from '../gql/queries'
import {CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM} from '../gql/mutations'
import {FIRST_ITEM, SECOND_ITEM, FIRST_ITEM_UPDATED} from '../common/constants'

const ITEMS_QUERY_ORIGINAL = {
  request: {
    query: ITEMS,
    variables: {word: '', offset: 0},
  },
  result: {
    data: {
      itemCount: 1,
      items: [FIRST_ITEM],
    },
  },
}

const CREATE_ITEM_MUTATION = {
  request: {
    query: CREATE_ITEM,
    variables: {
      word: SECOND_ITEM.word,
      description: SECOND_ITEM.description,
    },
  },
  result: {
    data: {
      createItem: SECOND_ITEM,
    },
  },
}

const CREATE_DUPLICATE_ITEM_MUTATION = {
  request: {
    query: CREATE_ITEM,
    variables: {
      word: FIRST_ITEM.word,
      description: SECOND_ITEM.description,
    },
  },
  result: {
    data: {createItem: null},
    errors: [
      {
        locations: [{column: 0, line: 2}],
        message: 'The word has already been collected.',
        path: ['createItem'],
      },
    ],
  },
}

const ITEMS_QUERY_AFTER_CREATE = {
  request: {
    query: ITEMS,
    variables: {word: '', offset: 0},
  },
  result: {
    data: {
      itemCount: 2,
      items: [FIRST_ITEM, SECOND_ITEM],
    },
  },
}

const UPDATE_ITEM_MUTATION = {
  request: {
    query: UPDATE_ITEM,
    variables: {
      word: FIRST_ITEM.word,
      description: FIRST_ITEM_UPDATED.description,
    },
  },
  result: {
    data: {
      updateItem: FIRST_ITEM_UPDATED,
    },
  },
}

const DELETE_ITEM_MUTATION = {
  request: {
    query: DELETE_ITEM,
    variables: {
      word: FIRST_ITEM.word,
    },
  },
  result: {
    data: {
      deleteItem: FIRST_ITEM,
    },
  },
}

const ITEMS_QUERY_AFTER_UPDATE = {
  request: {
    query: ITEMS,
    variables: {word: '', offset: 0},
  },
  result: {
    data: {
      itemCount: 1,
      items: [FIRST_ITEM_UPDATED],
    },
  },
}

const ITEMS_QUERY_AFTER_DELETE = {
  request: {
    query: ITEMS,
    variables: {word: '', offset: 0},
  },
  result: {
    data: {
      itemCount: 0,
      items: [],
    },
  },
}

const ITEMS_QUERY_FILTERED = {
  request: {
    query: ITEMS,
    variables: {word: 'foobar', offset: 0},
  },
  result: {
    data: {
      itemCount: 0,
      items: [],
    },
  },
}

export const CREATE_MOCK = [
  ITEMS_QUERY_ORIGINAL,
  CREATE_ITEM_MUTATION,
  ITEMS_QUERY_AFTER_CREATE,
]
export const CREATE_DUPLICATE_MOCK = [
  ITEMS_QUERY_ORIGINAL,
  CREATE_DUPLICATE_ITEM_MUTATION,
  ITEMS_QUERY_ORIGINAL,
]
export const UPDATE_MOCK = [
  ITEMS_QUERY_ORIGINAL,
  UPDATE_ITEM_MUTATION,
  ITEMS_QUERY_AFTER_UPDATE,
]
export const DELETE_MOCK = [
  ITEMS_QUERY_ORIGINAL,
  DELETE_ITEM_MUTATION,
  ITEMS_QUERY_AFTER_DELETE,
]
export const SEARCH_MOCK = [ITEMS_QUERY_ORIGINAL, ITEMS_QUERY_FILTERED]
