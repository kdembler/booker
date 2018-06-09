export interface Book {
  author: string
  isbn: string
  pages: number
  rating: number
  title: string
}

export interface EditState {
  book?: Book
  open: boolean
  values: Book
}

export interface AppState {
  books?: Book[]
  edit: EditState
}
