import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { EditRequest, RemovalRequest } from '../../common/types'
import { Book, BookerState } from '../types'
import { apiRequest } from '../utils'
import * as types from './types'

const delay = (s: number) => new Promise((resolve, error) => setTimeout(() => resolve(), s * 1000))

type AsyncAction = ThunkAction<Promise<void>, BookerState, undefined, types.BookerAction>

// async actions
export const refreshBooks = (): AsyncAction => {
  return (dispatch: Dispatch<types.BookerAction>) => {
    return delay(1).then(() => {
      return fetch('/api/books')
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
    })
  }
}

export const addBook = (book: Book): AsyncAction => {
  return (dispatch: Dispatch<types.BookerAction>) => {
    return delay(1).then(() => {
      const data = JSON.stringify(book)
      return apiRequest('POST', data)
        .then(({ response, status }) => {
          if (status === 201) {
            dispatch({
              book,
              type: 'BOOK_ADD'
            })
          }
        })
        .catch(() => {
          // handle error
        })
    })
  }
}

export const editBook = (book: Book, isbn: string): AsyncAction => {
  return (dispatch: Dispatch<types.BookerAction>) => {
    return delay(1).then(() => {
      const req: EditRequest = {
        book,
        isbn
      }
      const data = JSON.stringify(req)
      return apiRequest('PUT', data)
        .then(({ response, status }) => {
          if (status === 204) {
            dispatch({
              book,
              isbn,
              type: 'BOOK_EDIT'
            })
          }
        })
        .catch(() => {
          // handle error
        })
    })
  }
}

export const removeBook = (isbn: string): AsyncAction => {
  return (dispatch: Dispatch<types.BookerAction>) => {
    return delay(1).then(() => {
      const req: RemovalRequest = {
        isbn
      }
      const data = JSON.stringify(req)
      return apiRequest('DELETE', data)
        .then(({ response, status }) => {
          if (status === 204 || status === 404) {
            // accept 404 as well, user doesn't care that it was already deleted
            dispatch({
              isbn,
              type: 'BOOK_REMOVE'
            })
          }
        })
        .catch(() => {
          // handle error
        })
    })
  }
}

// standard actions
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

export const changeSending = (sending: boolean): types.ChangeSendingAction => ({
  sending,
  type: 'EDIT_SENDING'
})

export const changeFetching = (fetching: boolean): types.ChangeFetchingAction => ({
  fetching,
  type: 'BOOKS_FETCHING'
})

export const changeRemoving = (isbn: string, removing: boolean): types.ChangeRemovingAction => ({
  isbn,
  removing,
  type: 'BOOK_REMOVAL'
})
