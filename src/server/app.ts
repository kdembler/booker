import * as express from 'express'
import * as path from 'path'

import { exampleBooks } from '../common/constants'
import { Book, EditRequest, RemovalRequest } from '../common/types'
import { API_ENDPOINT, DEV_PORT, PROD_PORT } from './constants'
import { validateBook } from './utils'

const clientBuildPath = path.join(__dirname, '..', '..', '..', 'build')
const port = process.env.NODE_ENV === 'development' ? DEV_PORT : PROD_PORT

const app = express()
app.use(express.static(clientBuildPath))
app.use(express.json())

let books = exampleBooks

app.get('/', (req, res) => res.sendFile(path.join(clientBuildPath, 'index.html')))

app.get(API_ENDPOINT, (req, res) => {
  res.json(books)
})

app.post(API_ENDPOINT, (req, res) => {
  const book = req.body as Book
  const errors = validateBook(book)

  if (errors.length !== 0) {
    res.status(400)
    res.json({ errors })
  } else {
    books = [...books, book]
    res.status(201) // created
    res.json(book)
  }
})

app.put(API_ENDPOINT, (req, res) => {
  const edit = req.body as EditRequest
  const errors = validateBook(edit.book)
  if (errors.length !== 0) {
    res.status(400)
    res.json({ errors })
    return
  }
  if (books.filter(book => book.isbn === edit.isbn).length === 0) {
    res.status(404)
    res.json({ errors: ['book not found'] })
    return
  }

  books = books.map(book => (book.isbn === edit.isbn ? edit.book : book))
  res.status(204) // no content
  res.send()
})

app.delete(API_ENDPOINT, (req, res) => {
  const removal = req.body as RemovalRequest
  if (books.filter(book => book.isbn === removal.isbn).length === 0) {
    res.status(404)
    res.json({ errors: ['book not found'] })
    return
  }

  books = books.filter(book => book.isbn !== removal.isbn)
  res.status(204)
  res.send()
})

app.listen(port, () => console.log(`Booker listening on ${port}!`))
