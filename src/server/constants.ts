import * as path from 'path'

const DEV_PORT = 3001
const PROD_PORT = 8080
export const PORT = process.env.NODE_ENV === 'development' ? DEV_PORT : PROD_PORT

export const API_ENDPOINT = '/api/books'

export const STATIC_PATH = path.join(__dirname, '..', '..', '..', 'build')

export const bookFields = ['author', 'isbn', 'pages', 'rating', 'title']

export const requestNotFoundErrorMessage = {
  errors: ['isbn already used']
}

export const requestConflictErrorMessage = {
  errors: ['book not found']
}

export const requestInvalidRouteErrorMessage = {
  errors: ['invalid isbn route']
}

export const errorMessages = {
  author: 'author field must be at least 1 character long',
  isbn: 'isbn field must contain valid ISBN identifier',
  pages: 'pages field must contain valid number of pages',
  rating: 'rating must be an integer in range 1-5',
  title: 'title field must be at least 1 character long'
}
