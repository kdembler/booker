import { AppState, Book, EditState } from './types'

export const emptyBook: Book = {
  author: '',
  isbn: '',
  pages: 1,
  rating: 1,
  title: ''
}

export const initialBooksState: Book[] = [
  {
    author: 'Orson Scott Card',
    isbn: '0-312-93208-1',
    pages: 256,
    rating: 5,
    title: "Ender's Game"
  },
  {
    author: 'Murray Rothbard',
    isbn: '978-1607967729',
    pages: 24,
    rating: 4,
    title: 'The Anatomy of the State'
  },
  {
    author: 'Stephenie Meyer',
    isbn: '0-316-16017-2',
    pages: 498,
    rating: 2,
    title: 'Twilight'
  }
]

export const initalEditState: EditState = {
  book: undefined,
  errors: {
    author: false,
    isbn: false,
    pages: false,
    title: false
  },
  open: false,
  values: emptyBook
}

export const initialState: AppState = {
  books: initialBooksState,
  edit: initalEditState
}

export const errorMessages = {
  author: 'Please fill author field',
  isbn: 'Please enter a valid ISBN identifier',
  pages: 'Please enter a valid number of pages',
  title: 'Please fill title field'
}

export const editFields = ['title', 'author', 'isbn', 'pages']
