import { Book } from '../common/types'
import { StoreAddResult, StoreDeleteResult, StoreEditResult } from './types'

export default class Store {
  private books: Book[]

  constructor(init?: Book[]) {
    if (init) {
      this.books = init
    } else {
      this.books = []
    }
  }

  public getBooks(): Book[] {
    return this.books
  }

  public addBook(newBook: Book): StoreAddResult {
    if (this.isbnPresent(newBook.isbn)) {
      return 'CONFLICT'
    }

    this.books = [...this.books, newBook]
    return 'OK'
  }

  public editBook(isbn: string, newBook: Book): StoreEditResult {
    if (!this.isbnPresent(isbn)) {
      return 'NOT_FOUND'
    }
    if (isbn !== newBook.isbn && this.isbnPresent(newBook.isbn)) {
      return 'CONFLICT'
    }

    this.books = this.books.map(book => (book.isbn === isbn ? newBook : book))
    return 'OK'
  }

  public removeBook(isbn: string): StoreDeleteResult {
    if (!this.isbnPresent(isbn)) {
      return 'NOT_FOUND'
    }

    this.books = this.books.filter(book => book.isbn !== isbn)
    return 'OK'
  }

  private isbnPresent(isbn: string) {
    return this.books.filter(book => book.isbn === isbn).length !== 0
  }
}
