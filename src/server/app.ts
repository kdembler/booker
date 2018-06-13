import * as express from 'express'
import * as path from 'path'

import { exampleBooks } from '../common/constants'
import { Book, EditRequest, RemovalRequest } from '../common/types'
import {
  API_ENDPOINT,
  DEV_PORT,
  PROD_PORT,
  requestConflictErrorMessage,
  requestNotFoundErrorMessage
} from './constants'
import { validateBook } from './utils'

import Store from './store'

const clientBuildPath = path.join(__dirname, '..', '..', '..', 'build')
const port = process.env.NODE_ENV === 'development' ? DEV_PORT : PROD_PORT

const app = express()
app.use(express.static(clientBuildPath))
app.use(express.json())

const store = new Store(exampleBooks)

app.get('/', (req, res) => res.sendFile(path.join(clientBuildPath, 'index.html')))

app.get(API_ENDPOINT, (req, res) => {
  res.json(store.getBooks())
})

app.post(API_ENDPOINT, (req, res) => {
  const book = req.body as Book
  const errors = validateBook(book)
  if (errors.length !== 0) {
    res.status(400)
    res.json({ errors })
    return
  }

  const result = store.addBook(book)
  switch (result) {
    case 'CONFLICT':
      res.status(409)
      res.json(requestConflictErrorMessage)
    case 'OK':
      res.status(201) // created
      res.json(book)
  }
})

app.put(API_ENDPOINT, (req, res) => {
  const edit = req.body as EditRequest
  const errors = validateBook(edit.book)

  if (errors.length !== 0) {
    res.status(400) // conflict
    res.json({ errors })
    return
  }

  const result = store.editBook(edit.isbn, edit.book)
  switch (result) {
    case 'NOT_FOUND':
      res.status(404)
      res.json(requestNotFoundErrorMessage)
    case 'CONFLICT':
      res.status(409)
      res.json(requestConflictErrorMessage)
    case 'OK':
      res.status(204) // no content
      res.send()
  }
})

app.delete(API_ENDPOINT, (req, res) => {
  const removal = req.body as RemovalRequest

  const result = store.removeBook(removal.isbn)
  switch (result) {
    case 'NOT_FOUND':
      res.status(404)
      res.json(requestNotFoundErrorMessage)
    case 'OK':
      res.status(204)
      res.send()
  }
})

app.listen(port, () => console.log(`Booker listening on ${port}!`))
