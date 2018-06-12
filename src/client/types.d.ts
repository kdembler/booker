import { ThunkDispatch } from 'redux-thunk'

import { Book } from '../common/types'
import { BookerAction } from './actions/types'

export { Book, BookerAction }

// BookR is wrapper around Book for convenient storing of removal information
export interface BookR extends Book {
  removing: boolean
}

export interface BooksState {
  fetching: boolean
  list: BookR[]
  // removals: boolean[]
}

export interface EditState {
  book?: Book
  errors: {
    author: boolean
    isbn: boolean
    pages: boolean
    title: boolean
  }
  open: boolean
  sending: boolean
  values: Book
}

export interface BookerState {
  books: BooksState
  edit: EditState
}

export type BookerDispatch = ThunkDispatch<BookerState, undefined, BookerAction>
