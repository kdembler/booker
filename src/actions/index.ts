import { Book } from '../types'
import * as types from './types'

export const addBook = (book: Book): types.AddBookAction => ({
  book,
  type: 'BOOK_ADD'
})

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
