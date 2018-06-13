import { Book } from '../common/types'
import { isValidField } from '../common/utils'
import { bookFields, errorMessages } from './constants'

export const validateBook = (book: Book): string[] => {
  const errors: string[] = []
  bookFields.forEach(field => {
    if (!isValidField(field, book[field])) {
      errors.push(errorMessages[field])
    }
  })
  return errors
}
