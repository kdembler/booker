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
    console.log(`Provided check: ${check}`)
    const digits = toDigits(isbn.slice(0, 12))

    let c =
      digits.reduce((acc, cur, idx) => {
        if (idx % 2 === 1) {
          cur *= 3
        }
        return acc + cur
      }, 0) % 10
    c = 10 - c
    console.log(`Calculated check: ${check}`)

    return (c === 10 && check === 0) || c === check
  }
  return false
}