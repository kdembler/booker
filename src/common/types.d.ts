export interface Book {
  author: string
  isbn: string
  pages: number
  rating: number
  title: string
}

export interface EditRequest {
  isbn: string
  book: Book
}

export interface RemovalRequest {
  isbn: string
}
