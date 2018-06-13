const isValidIntegerValue = (value: string, predicate: (_: number) => boolean): boolean => {
  const parsed = Number.parseFloat(value)
  return !Number.isNaN(parsed) && Number.isInteger(parsed) && predicate(parsed)
}

export const isValidField = (field: string, value: string): boolean => {
  if (value === undefined || value === null) {
    return false
  }
  switch (field) {
    case 'pages':
      return isValidIntegerValue(value, n => n > 0)
    case 'isbn':
      return isValidISBN(value)
    case 'rating':
      return isValidIntegerValue(value, n => n >= 1 && n <= 5)
    default:
      return value.length > 0
  }
}

const toDigits = (i: string) => i.split('').map(Number)

export const isValidISBN = (isbnValue: string): boolean => {
  const isbn = isbnValue.replace(/[\-\s]/g, '')

  if (/^\d{9}[\dX]$/.test(isbn)) {
    // ISBN-10
    const check = isbn.slice(-1)
    const digits = toDigits(isbn.slice(0, 9))

    let c =
      digits.reduce((acc, cur, idx) => {
        return acc + cur * (10 - idx)
      }, 0) % 11
    c = 11 - c

    return (c === 10 && check === 'X') || c === Number(check)
  } else if (/^\d{13}$/.test(isbn)) {
    // ISBN-13
    const check = Number(isbn.slice(-1))
    const digits = toDigits(isbn.slice(0, 12))

    let c =
      digits.reduce((acc, cur, idx) => {
        if (idx % 2 === 1) {
          cur *= 3
        }
        return acc + cur
      }, 0) % 10
    c = 10 - c

    return (c === 10 && check === 0) || c === check
  }
  return false
}
