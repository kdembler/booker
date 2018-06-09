import * as React from 'react'
import { Container, Grid, Header, Icon } from 'semantic-ui-react'

import IBook from '../book'
import BookList from './BookList'

const books: IBook[] = [
  {
    author: 'Orson Scott Card',
    isbn: '0-312-93208-1',
    pages: 256,
    rating: 5,
    title: "Ender's Game"
  },
  {
    author: 'Murray Rothbard',
    isbn: '978-1607967729',
    pages: 24,
    rating: 4,
    title: 'The Anatomy of the State'
  },
  {
    author: 'Stephenie Meyer',
    isbn: '0-316-16017-2',
    pages: 498,
    rating: 2,
    title: 'Twilight'
  }
]

const BookerApp = () => {
  return (
    <Grid centered={true} padded="vertically" textAlign="center">
      <Grid.Row>
        <Container>
          <Header as="h1" icon={true} textAlign="center">
            <Icon name="book" circular={true} />
            Booker - <i>book your books</i>
          </Header>
          <BookList books={books} />
        </Container>
      </Grid.Row>
    </Grid>
  )
}

export default BookerApp
