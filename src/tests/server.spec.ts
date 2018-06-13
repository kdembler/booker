import { expect } from 'chai'
import 'mocha'

import { exampleBooks } from '../common/constants'
import { Book } from '../common/types'
import Store from '../server/store'

const testBook: Book = {
  author: 'Foo',
  isbn: '1111111111', // valid ISBN
  pages: 5,
  rating: 3,
  title: 'Bar'
}

describe('Booker server store', () => {
  it('Properly initializes without arguments', () => {
    const store = new Store()
    expect(store.getBooks()).to.eql([])
  })

  it('Properly initializes with supplied list', () => {
    const store = new Store(exampleBooks)
    expect(store.getBooks()).to.eql(exampleBooks)
  })

  it('Successfully adds new book', () => {
    const store = new Store()

    const result = store.addBook(testBook)
    expect(result).to.equal('OK')
    expect(store.getBooks()).to.eql([testBook])
  })

  it(`Doesn't accept book with conflicting ISBN`, () => {
    const store = new Store(exampleBooks)

    const result = store.addBook(exampleBooks[0])
    expect(result).to.equal('CONFLICT')
    expect(store.getBooks()).to.eql(exampleBooks)
  })

  it('Successfully edits existing book', () => {
    const store = new Store(exampleBooks)
    const replacedISBN = exampleBooks[0].isbn

    const result = store.editBook(replacedISBN, testBook)
    expect(result).to.equal('OK')
    const expectedBooks = exampleBooks.map(book => (book.isbn === replacedISBN ? testBook : book))
    expect(store.getBooks()).to.eql(expectedBooks)
  })

  it(`Doesn't allow editing nonexisting book`, () => {
    const store = new Store(exampleBooks)
    const replacedISBN = testBook.isbn

    const result = store.editBook(replacedISBN, testBook)
    expect(result).to.equal('NOT_FOUND')
    expect(store.getBooks()).to.eql(exampleBooks)
  })

  it(`Doesn't allow changing ISBN to already used one`, () => {
    const store = new Store(exampleBooks)
    const replacedISBN = exampleBooks[0].isbn
    const conflictingBook: Book = {
      ...exampleBooks[0],
      isbn: exampleBooks[1].isbn
    }

    const result = store.editBook(replacedISBN, conflictingBook)
    expect(result).to.equal('CONFLICT')
    expect(store.getBooks()).to.eql(exampleBooks)
  })

  it('Successfully removes existing book', () => {
    const store = new Store(exampleBooks)
    const removedISBN = exampleBooks[0].isbn

    const result = store.removeBook(removedISBN)
    expect(result).to.equal('OK')
    const expectedBooks = exampleBooks.filter(book => book.isbn !== removedISBN)
    expect(store.getBooks()).to.eql(expectedBooks)
  })

  it(`Doesn't allow removing nonexisting book`, () => {
    const store = new Store(exampleBooks)
    const removedISBN = testBook.isbn

    const result = store.removeBook(removedISBN)
    expect(result).to.equal('NOT_FOUND')
    expect(store.getBooks()).to.eql(exampleBooks)
  })
})

describe('Booker API server', () => {})
