import * as express from 'express'
import * as path from 'path'

import { exampleBooks } from '../common/constants'
import { Book, EditRequest, RemovalRequest } from '../common/types'

const clientBuildPath = path.join(__dirname, '..', '..', '..', 'build')
const port = process.env.NODE_ENV === 'development' ? 3001 : 8080

const app = express()
app.use(express.static(clientBuildPath))
app.use(express.json())

let books = exampleBooks

app.get('/', (req, res) => res.sendFile(path.join(clientBuildPath, 'index.html')))
app.get('/api/books', (req, res) => {
  res.send(JSON.stringify(books))
})
app.post('/api/books', (req, res) => {
  const book = req.body as Book
  books = [...books, book]
  res.send()
})
app.put('/api/books', (req, res) => {
  const edit = req.body as EditRequest
  books = books.map(book => (book.isbn === edit.isbn ? edit.book : book))
  res.send()
})
app.delete('/api/books', (req, res) => {
  const removal = req.body as RemovalRequest
  console.log(`Removing ${removal.isbn}`)
  books = books.filter(book => book.isbn !== removal.isbn)
  res.send()
})

app.listen(port, () => console.log(`Booker listening on ${port}!`))
