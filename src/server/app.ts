import * as express from 'express'
import * as path from 'path'

import { exampleBooks } from '../common/constants'
import { Book, EditRequest } from '../common/types'

const clientBuildPath = path.join(__dirname, '..', '..', '..', 'build')
const port = process.env.NODE_ENV === 'development' ? 3001 : 8080

const app = express()
app.use(express.static(clientBuildPath))
app.use(express.json())

const books = exampleBooks

app.get('/', (req, res) => res.sendFile(path.join(clientBuildPath, 'index.html')))
app.get('/api/books', (req, res) => {
  res.send(JSON.stringify(books))
})
app.post('/api/books', (req, res) => {
  const book = req.body as Book
  books.push(book)
  res.send()
})
app.put('/api/books', (req, res) => {
  const edit = req.body as EditRequest
  for (let i = 0; i < books.length; i++) {
    if (books[i].isbn === edit.isbn) {
      books[i] = edit.book
      break
    }
  }
  res.send()
})

app.listen(port, () => console.log(`Booker listening on ${port}!`))
