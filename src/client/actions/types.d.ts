import { Action } from 'redux'

import { Book } from '../types'

export interface AddBookAction extends Action {
  type: 'BOOK_ADD'
  book: Book
}

export interface ChangeFetchingAction extends Action {
  type: 'BOOKS_FETCHING'
  fetching: boolean
}

export interface EditBookAction extends Action {
  type: 'BOOK_EDIT'
  isbn: string
  book: Book
}

export interface RemoveBookAction extends Action {
  type: 'BOOK_REMOVE'
  book: Book
}

export interface ReplaceBooksAction extends Action {
  type: 'BOOKS_REPLACE_ALL'
  books: Book[]
}

export type BooksAction =
  | AddBookAction
  | ChangeFetchingAction
  | EditBookAction
  | RemoveBookAction
  | ReplaceBooksAction

export interface OpenEditAction extends Action {
  type: 'EDIT_OPEN'
  book?: Book
}

export interface CloseEditAction extends Action {
  type: 'EDIT_CLOSE'
}

export interface ChangeValueAction extends Action {
  type: 'EDIT_ONCHANGE'
  field: string
  value: string | number
}

export interface ChangeValidationErrorAction extends Action {
  type: 'EDIT_VALIDATION_ERROR'
  field: string
  error: boolean
}

export type EditAction =
  | OpenEditAction
  | CloseEditAction
  | ChangeValueAction
  | ChangeValidationErrorAction

export type BookerAction = BooksAction | EditAction
