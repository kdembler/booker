import { combineReducers } from 'redux'

import { BooksAction, EditAction } from '../actions/types'
import { emptyBook, initalBooksState, initalEditState } from '../constants'
import { BooksState, EditState } from '../types'

const books = (state: BooksState = initalBooksState, action: BooksAction): BooksState => {
  let list
  switch (action.type) {
    case 'BOOK_ADD':
      return {
        fetching: state.fetching,
        list: [...state.list, action.book]
      }
    case 'BOOK_EDIT':
      list = state.list.map(book => (book.isbn !== action.isbn ? book : action.book))
      return {
        fetching: state.fetching,
        list
      }
    case 'BOOKS_FETCHING':
      return {
        fetching: action.fetching,
        list: state.list
      }
    case 'BOOKS_REPLACE_ALL':
      return {
        fetching: state.fetching,
        list: action.books
      }
    case 'BOOK_REMOVE':
      list = state.list.filter(book => book.isbn !== action.book.isbn)
      return {
        fetching: state.fetching,
        list
      }
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
