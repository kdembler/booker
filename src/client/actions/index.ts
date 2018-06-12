import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { Book, BookerState } from '../types'
import * as types from './types'

const delay = (s: number) => new Promise((resolve, error) => setTimeout(() => resolve(), s * 1000))

type AsyncAction = ThunkAction<void, BookerState, undefined, types.BookerAction>

// async actions
export const refreshBooks = (): AsyncAction => {
  return (dispatch: Dispatch<types.BookerAction>) => {
    dispatch(changeFetching(true))
    delay(2).then(() => {
      fetch('/api/books')
        .then(response => {
          if (!response.ok) {
            // handle error
          }
          return response.json()
        })
        .then(json => {
          const books = json as Book[]
          dispatch({
            books,
            type: 'BOOKS_REPLACE_ALL'
          })
        })
        .then(() => dispatch(changeFetching(false)))
    })
  }
}

const changeFetching = (fetching: boolean): types.ChangeFetchingAction => ({
  fetching,
  type: 'BOOKS_FETCHING'
})

export const addBook = (book: Book): AsyncAction => {
  return (dispatch: Dispatch<types.BookerAction>) => {
    dispatch(changeSending(true))
    delay(2).then(() => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', '/api/books', true)
      xhr.setRequestHeader('Content-Type', 'application/json')
      const data = JSON.stringify(book)
      xhr.send(data)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            dispatch({
              book,
              type: 'BOOK_ADD'
            })
            dispatch(closeEdit())
          } else {
            // handle error
          }
          dispatch(changeSending(false))
        }
      }
    })
  }
}

const changeSending = (sending: boolean): types.ChangeSendingAction => ({
  sending,
  type: 'EDIT_SENDING'
})

// standard actions
export const editBook = (book: Book, isbn: string): types.EditBookAction => ({
  book,
  isbn,
  type: 'BOOK_EDIT'
})

export const removeBook = (book: Book): types.RemoveBookAction => ({
  book,
  type: 'BOOK_REMOVE'
})

export const openEdit = (book?: Book): types.OpenEditAction => ({
  book,
  type: 'EDIT_OPEN'
})

export const closeEdit = (): types.CloseEditAction => ({
  type: 'EDIT_CLOSE'
})

export const changeValue = (field: string, value: string | number): types.ChangeValueAction => ({
  field,
  type: 'EDIT_ONCHANGE',
  value
})

export const changeValidationError = (
  field: string,
  error: boolean
): types.ChangeValidationErrorAction => ({
  error,
  field,
  type: 'EDIT_VALIDATION_ERROR'
})
