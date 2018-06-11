import { combineReducers } from 'redux'

import { BooksAction, EditAction } from '../actions/types'
import { emptyBook, initalEditState } from '../constants'
import { Book, EditState } from '../types'

const books = (state: Book[] = [], action: BooksAction): Book[] => {
  switch (action.type) {
    case 'BOOK_ADD':
      return [...state, action.book]
    case 'BOOK_EDIT':
      return state.map(book => (book.isbn !== action.isbn ? book : action.book))
    case 'BOOK_REMOVE':
      return state.filter(book => book.isbn !== action.book.isbn)
    default:
      return state
  }
}

const noEditErrors = {
  author: false,
  isbn: false,
  pages: false,
  title: false
}

const edit = (state: EditState = initalEditState, action: EditAction): EditState => {
  switch (action.type) {
    case 'EDIT_OPEN':
      return {
        ...state,
        book: action.book,
        open: true,
        values: action.book || emptyBook
      }
    case 'EDIT_CLOSE':
      return {
        ...state,
        errors: noEditErrors,
        open: false
      }
    case 'EDIT_ONCHANGE':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value
        }
      }
    case 'EDIT_VALIDATION_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error
        }
      }
    default:
      return state
  }
}

const bookerReducer = combineReducers({
  books,
  edit
})

export default bookerReducer
