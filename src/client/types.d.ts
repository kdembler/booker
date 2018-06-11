import { Book } from '../common/types'

export { Book }

export interface EditState {
  book?: Book
  errors: {
    author: boolean
    isbn: boolean
    pages: boolean
    title: boolean
  }
  open: boolean
  values: Book
}

export interface AppState {
  books: Book[]
  edit: EditState
}
