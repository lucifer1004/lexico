import React from 'react'
import {act} from 'react-dom/test-utils'
import {render, wait, fireEvent} from '@testing-library/react'
import {MockedProvider, MockedResponse} from '@apollo/react-testing'

import {MessageProvider} from './contexts/MessageContext'
import App from './App'
import {
  CREATE_MOCK,
  UPDATE_MOCK,
  DELETE_MOCK,
  SEARCH_MOCK,
  CREATE_DUPLICATE_MOCK,
} from './mocks'
import {FIRST_ITEM, SECOND_ITEM} from './common/constants'

beforeEach(() => {
  ;(window as any).getSelection = () => ({
    removeAllRanges: () => {},
  })
})

describe('create a new item', () => {
  test('successfully', async () => {
    const {container, queryByText} = render(
      <MockedProvider mocks={CREATE_MOCK}>
        <MessageProvider>
          <App />
        </MessageProvider>
      </MockedProvider>,
    )

    // Render loading
    expect(container.innerHTML).toMatch('Loading...')

    // Wait for loading
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })

    // Render items
    expect(container.innerHTML).toMatch(FIRST_ITEM.word)

    // Click the add button to navigate to /edit
    act(() => {
      const addButton = queryByText(/Add/i)!.closest('button')!
      fireEvent.click(addButton)
    })

    // Wait for navigation
    await wait(() => {
      expect(container.innerHTML).not.toMatch(FIRST_ITEM.word)
    })

    // Render slate editor
    expect(container.innerHTML).toMatch('A line of text in a paragraph.')

    // Since word is empty, the save button should be disabled
    const saveButton = queryByText(/Save/i)!.closest('button')!
    expect(saveButton).toHaveAttribute('disabled')

    // Enter the word
    act(() => {
      const wordInput = container.getElementsByTagName('input')[0]
      fireEvent.change(wordInput, {
        target: {value: SECOND_ITEM.word},
      })
    })

    // The save button should be enabled
    expect(saveButton).not.toHaveAttribute('disabled')

    // Click the save button
    act(() => {
      fireEvent.click(saveButton)
    })

    // A success message should popped up.
    await wait(() => {
      expect(container.innerHTML).toMatch(
        `"${SECOND_ITEM.word}" has been added to dictionary.`,
      )
    })

    // Then disappear
    await wait(() => {
      expect(container.innerHTML).not.toMatch(
        `"${SECOND_ITEM.word}" has been added to dictionary.`,
      )
    })

    // Navigate back to /
    act(() => {
      fireEvent.click(queryByText('My Dict')!)
    })

    // Wait for navigation
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Save')
    })

    // The newly added item should be displayed
    expect(container.innerHTML).toMatch(SECOND_ITEM.word)
  })

  test('failed due to duplicity', async () => {
    const {container, queryByText} = render(
      <MockedProvider mocks={CREATE_DUPLICATE_MOCK as MockedResponse[]}>
        <MessageProvider>
          <App />
        </MessageProvider>
      </MockedProvider>,
    )

    // Wait for loading
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })

    // Click the add button to navigate to /edit
    act(() => {
      const addButton = queryByText(/Add/i)!.closest('button')!
      fireEvent.click(addButton)
    })

    // Wait for navigation
    await wait(() => {
      expect(container.innerHTML).not.toMatch(FIRST_ITEM.word)
    })

    // Enter the word
    const saveButton = queryByText(/Save/i)!.closest('button')!
    act(() => {
      const wordInput = container.getElementsByTagName('input')[0]
      fireEvent.change(wordInput, {
        target: {
          value: FIRST_ITEM.word,
        },
      })
    })

    // Click the save button
    act(() => {
      fireEvent.click(saveButton)
    })

    // An error message should popped up.
    await wait(() => {
      expect(container.innerHTML).toMatch(
        'The word has already been collected.',
      )
    })

    // Then disappear
    await wait(() => {
      expect(container.innerHTML).not.toMatch(
        'The word has already been collected.',
      )
    })

    // Navigate back to /
    act(() => {
      fireEvent.click(queryByText('My Dict')!)
    })

    // Wait for navigation
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Save')
    })

    expect(container.innerHTML).toMatch('I am a mocked item')
  })
})

describe('edit an item', () => {
  test('successfully', async () => {
    const {container, queryByText} = render(
      <MockedProvider mocks={UPDATE_MOCK}>
        <MessageProvider>
          <App />
        </MessageProvider>
      </MockedProvider>,
    )

    // Wait for loading
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })

    // Navigate to /edit/first
    act(() => {
      fireEvent.click(queryByText(FIRST_ITEM.word)!)
    })

    // Wait for navigation
    await wait(() => {
      expect(container.innerHTML).toMatch('Save')
    })

    // Click the save button
    const saveButton = queryByText(/Save/i)!.closest('button')!
    // Click the save button
    act(() => {
      fireEvent.click(saveButton)
    })

    // A success message should popped up.
    await wait(() => {
      expect(container.innerHTML).toMatch(
        `"${FIRST_ITEM.word}" has been updated.`,
      )
    })

    // Then disappear
    await wait(() => {
      expect(container.innerHTML).not.toMatch(
        `"${FIRST_ITEM.word}" has been updated.`,
      )
    })

    // Navigate back to /
    act(() => {
      fireEvent.click(queryByText('My Dict')!)
    })

    // Wait for navigation
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Save')
    })

    expect(container.innerHTML).toMatch('I am a mocked item')
  })
})

describe('delete an item', () => {
  test('successfully', async () => {
    const {container, queryByText} = render(
      <MockedProvider mocks={DELETE_MOCK}>
        <MessageProvider>
          <App />
        </MessageProvider>
      </MockedProvider>,
    )

    // Wait for loading
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })

    // Click the delete button
    const deleteButton = queryByText(/delete/i)!.closest('button')!
    // Click the save button
    act(() => {
      fireEvent.click(deleteButton)
    })

    // A success message should popped up.
    await wait(() => {
      expect(container.innerHTML).toMatch(
        `"${FIRST_ITEM.word}" has been deleted.`,
      )
    })

    // Then disappear
    await wait(() => {
      expect(container.innerHTML).not.toMatch(
        `"${FIRST_ITEM.word}" has been deleted.`,
      )
    })

    // Wait for change
    await wait(() => {
      expect(container.innerHTML).toMatch('Not found.')
    })
  })
})

describe('search', () => {
  test('successfully', async () => {
    const {container} = render(
      <MockedProvider mocks={SEARCH_MOCK}>
        <MessageProvider>
          <App />
        </MessageProvider>
      </MockedProvider>,
    )

    // Wait for loading
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })

    // Enter search
    act(() => {
      const searchInput = container.getElementsByTagName('input')[0]
      fireEvent.change(searchInput, {
        target: {value: 'foobar'},
      })
    })

    // Wait for change
    await wait(() => {
      expect(container.innerHTML).toMatch('Not found.')
    })
  })
})
