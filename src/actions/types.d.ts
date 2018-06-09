import { Action } from 'redux'

import { Book } from '../types'

export interface AddBookAction extends Action {
  type: 'ADD_BOOK'
  book: Book
}

export interface EditBookAction extends Action {
  type: 'EDIT_BOOK'
  isbn: string
  book: Book
}

export interface RemoveBookAction extends Action {
  type: 'REMOVE_BOOK'
  book: Book
}

export type BooksAction = AddBookAction | EditBookAction | RemoveBookAction

export interface OpenEditAction extends Action {
  type: 'OPEN_EDIT'
  book: Book
}

export interface CloseEditAction extends Action {
  type: 'CLOSE_EDIT'
}

export interface ChangeValueAction extends Action {
  type: 'ONCHANGE_EDIT'
  field: string
  value: string | number
}

export type EditAction = OpenEditAction | CloseEditAction | ChangeValueAction

export type BookerAction = BooksAction | EditAction
