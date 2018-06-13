import * as express from 'express'
import * as path from 'path'

import { exampleBooks } from '../common/constants'
import { Book, EditRequest, RemovalRequest } from '../common/types'
import {
  API_ENDPOINT,
  PORT,
  requestConflictErrorMessage,
  requestNotFoundErrorMessage,
  STATIC_PATH
} from './constants'
import Store from './store'
import { validateBook } from './utils'

export default class Server {
  private app: express.Express
  private store: Store

  constructor(newStore?: Store) {
    if (newStore) {
      this.store = newStore
    } else {
      this.store = new Store(exampleBooks)
    }

    this.setUpExpress()
    this.registerRoutes()
  }

  public run(port?: number) {
    if (!port) {
      port = PORT
    }

    this.app.listen(port, () => console.log(`Booker listening on ${port}!`))
  }

  private setUpExpress() {
    this.app = express()
    this.app.use(express.static(STATIC_PATH))
    this.app.use(express.json())
  }

  private registerRoutes() {
    this.app.get('/', this.indexHandler.bind(this))
    this.app.get(API_ENDPOINT, this.getHandler.bind(this))
    this.app.post(API_ENDPOINT, this.addHandler.bind(this))
    this.app.put(API_ENDPOINT, this.editHandler.bind(this))
    this.app.delete(API_ENDPOINT, this.removeHandler.bind(this))
  }

  private indexHandler(req: express.Request, res: express.Response) {
    res.sendFile(path.join(STATIC_PATH, 'index.html'))
  }

  private getHandler(req: express.Request, res: express.Response) {
    res.json(this.store.getBooks())
  }

  private addHandler(req: express.Request, res: express.Response) {
    const book = req.body as Book
    const errors = validateBook(book)
    if (errors.length !== 0) {
      res.status(400)
      res.json({ errors })
      return
    }

    const result = this.store.addBook(book)
    switch (result) {
      case 'CONFLICT':
        res.status(409)
        res.json(requestConflictErrorMessage)
      case 'OK':
        res.status(201) // created
        res.json(book)
    }
  }

  private editHandler(req: express.Request, res: express.Response) {
    const edit = req.body as EditRequest
    const errors = validateBook(edit.book)

    if (errors.length !== 0) {
      res.status(400) // conflict
      res.json({ errors })
      return
    }

    const result = this.store.editBook(edit.isbn, edit.book)
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
  }

  private removeHandler(req: express.Request, res: express.Response) {
    const removal = req.body as RemovalRequest

    const result = this.store.removeBook(removal.isbn)
    switch (result) {
      case 'NOT_FOUND':
        res.status(404)
        res.json(requestNotFoundErrorMessage)
      case 'OK':
        res.status(204)
        res.send()
    }
  }
}
