export const DEV_PORT = 3001
export const PROD_PORT = 8080

export const API_ENDPOINT = '/api/books'

export const bookFields = ['author', 'isbn', 'pages', 'rating', 'title']

export const errorMessages = {
  author: 'author field must be at least 1 character long',
  isbn: 'isbn field must contain valid ISBN identifier',
  pages: 'pages field must contain valid number of pages',
  rating: 'rating must be an integer in range 1-5',
  title: 'title field must be at least 1 character long'
}
