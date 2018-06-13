import { expect } from 'chai'
import 'mocha'

import { isValidField } from '../common/utils'

const validISBN10 = '0-316-16017-2'
const validISBN13 = '978-1607967729'
const invalidISBNs = ['0-316-16017-1', '971-1607967729', '', 'foobar']
const invalidPagesCounts = ['0', '', 'foo', '-1', '2.5']
const invalidRatings = ['0', '6', '', 'foo', '1.5']

describe('Booker field validator', () => {
  it('Accepts valid ISBN-10 identifiers', () => {
    const valid = isValidField('isbn', validISBN10)
    expect(valid).to.equal(true)
  })

  it('Accepts valid ISBN-13 identifiers', () => {
    const valid = isValidField('isbn', validISBN13)
    expect(valid).to.equal(true)
  })

  it(`Doesn't accept invalid ISBNs`, () => {
    const valid = invalidISBNs.map(v => isValidField('isbn', v))
    valid.forEach(v => expect(v).to.equal(false))
  })

  it('Accepts valid pages counts', () => {
    const valid = isValidField('pages', '100')
    expect(valid).to.equal(true)
  })

  it(`Doesn't accept invalid pages counts`, () => {
    const valid = invalidPagesCounts.map(v => isValidField('pages', v))
    valid.forEach(v => expect(v).to.equal(false))
  })

  it('Accepts valid ratings', () => {
    const valid1 = isValidField('rating', '1')
    const valid2 = isValidField('rating', '5')
    expect(valid1).to.equal(true)
    expect(valid2).to.equal(true)
  })

  it(`Doesn't accept invalid rating`, () => {
    const valid = invalidRatings.map(v => isValidField('rating', v))
    valid.forEach(v => expect(v).to.equal(false))
  })

  it('Accepts valid authors and titles', () => {
    const valid = isValidField('author', 'foobar')
    expect(valid).to.equal(true)
  })

  it(`Doesn't accept invalid authors and titles`, () => {
    const valid = isValidField('author', '')
    expect(valid).to.equal(false)
  })
})
