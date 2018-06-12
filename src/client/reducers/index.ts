import { combineReducers } from 'redux'

import { BooksAction, EditAction } from '../actions/types'
import { emptyBook, initalBooksState, initalEditState } from '../constants'
import { Book, BookR, BooksState, EditState } from '../types'

const wrap = (book: Book): BookR => ({
  ...book,
  removing: false
})

const books = (state: BooksState = initalBooksState, action: BooksAction): BooksState => {
  let list
  switch (action.type) {
    case 'BOOK_ADD':
      return {
        ...state,
        list: [...state.list, wrap(action.book)]
      }
    case 'BOOK_EDIT':
      list = state.list.map(book => (book.isbn !== action.isbn ? book : wrap(action.book)))
      return {
        ...state,
        list
      }
    case 'BOOKS_FETCHING':
      return {
        ...state,
        fetching: action.fetching
      }
    case 'BOOKS_REPLACE_ALL':
      list = action.books.map(wrap)
      return {
        ...state,
        list
      }
    case 'BOOK_REMOVE':
      list = state.list.filter(book => book.isbn !== action.isbn)
      return {
        ...state,
        list
      }
    case 'BOOK_REMOVAL':
      list = state.list.map(
        book => (book.isbn !== action.isbn ? book : { ...book, removing: action.removing })
      )
      return {
        ...state,
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
    case 'EDIT_SENDING':
      return {
        ...state,
        sending: action.sending
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
