import * as express from 'express'
import * as path from 'path'

import { exampleBooks } from '../common/constants'
import { Book } from '../common/types'
import {
  API_ENDPOINT,
  PORT,
  requestConflictErrorMessage,
  requestInvalidRouteErrorMessage,
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

  // for testing
  public getApp() {
    return this.app
  }

  private setUpExpress() {
    this.app = express()
    this.app.use(express.static(STATIC_PATH))
    this.app.use(express.json())

    // validation middlewares
    this.app.post(`${API_ENDPOINT}`, this.bookMiddleware)
    this.app.put(`${API_ENDPOINT}/:isbn`, this.bookMiddleware)
    this.app.put(`${API_ENDPOINT}/:isbn`, this.isbnMiddleware)
    this.app.delete(`${API_ENDPOINT}/:isbn`, this.isbnMiddleware)
  }

  private bookMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const book = req.body as Book
    const errors = validateBook(book)
    if (errors.length !== 0) {
      res.status(400)
      res.json({ errors })
      return
    }
    res.locals.book = book
    next()
  }

  private isbnMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const isbn = req.params.isbn as string
    if (!isbn || isbn.length < 10) {
      res.status(400)
      res.json(requestInvalidRouteErrorMessage)
    }
    res.locals.isbn = isbn
    next()
  }

  private registerRoutes() {
    this.app.get('/', this.indexHandler.bind(this))
    this.app.get(API_ENDPOINT, this.getHandler.bind(this))
    this.app.post(API_ENDPOINT, this.addHandler.bind(this))
    this.app.put(`${API_ENDPOINT}/:isbn`, this.editHandler.bind(this))
    this.app.delete(`${API_ENDPOINT}/:isbn`, this.removeHandler.bind(this))
  }

  private indexHandler(req: express.Request, res: express.Response) {
    res.sendFile(path.join(STATIC_PATH, 'index.html'))
  }

  private getHandler(req: express.Request, res: express.Response) {
    res.json(this.store.getBooks())
  }

  private addHandler(req: express.Request, res: express.Response) {
    const { book } = res.locals

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
    const { isbn, book } = res.locals

    const result = this.store.editBook(isbn, book)
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
    const { isbn } = res.locals

    const result = this.store.removeBook(isbn)
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
