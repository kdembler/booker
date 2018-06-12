import { Book, BooksState, EditState } from './types'

export const emptyBook: Book = {
  author: '',
  isbn: '',
  pages: 1,
  rating: 1,
  title: ''
}

export const initalBooksState: BooksState = {
  fetching: true,
  list: []
}

export const initalEditState: EditState = {
  book: undefined,
  errors: {
    author: false,
    isbn: false,
    pages: false,
    title: false
  },
  open: false,
  sending: false,
  values: emptyBook
}

export const errorMessages = {
  author: 'Please fill author field',
  isbn: 'Please enter a valid ISBN identifier',
  pages: 'Please enter a valid number of pages',
  title: 'Please fill title field'
}

export const editFields = ['title', 'author', 'isbn', 'pages']
