import { combineReducers } from 'redux'

import { BooksAction, EditAction } from '../actions/types'
import { emptyBook, initalEditState } from '../constants'
import { Book, EditState } from '../types'

const books = (state: Book[] = [], action: BooksAction): Book[] => {
  switch (action.type) {
    case 'ADD_BOOK':
      return [...state, action.book]
    case 'EDIT_BOOK':
      return state.map(book => (book.isbn !== action.isbn ? book : action.book))
    case 'REMOVE_BOOK':
      return state.filter(book => book.isbn !== action.book.isbn)
    default:
      return state
  }
}

const edit = (state: EditState = initalEditState, action: EditAction): EditState => {
  switch (action.type) {
    case 'OPEN_EDIT':
      return {
        ...state,
        book: action.book,
        open: true,
        values: action.book || emptyBook
      }
    case 'CLOSE_EDIT':
      return {
        ...state,
        open: false
      }
    case 'ONCHANGE_EDIT':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value
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
