import * as React from 'react'
import { Button, Container, Grid, Header, Icon, Rating, Table } from 'semantic-ui-react'

interface IBook {
  author: string
  isbn: string
  pages: number
  rating: number
  title: string
}

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
  const rows = books.map(book => (
    <Table.Row>
      <Table.Cell>{book.title}</Table.Cell>
      <Table.Cell>{book.author}</Table.Cell>
      <Table.Cell>{book.isbn}</Table.Cell>
      <Table.Cell>{book.pages}</Table.Cell>
      <Table.Cell>
        <Rating maxRating={5} rating={book.rating} disabled={true} icon="star" />
      </Table.Cell>
      <Table.Cell width="2">
        <Button color="blue" icon="edit" />
        <Button color="red" icon="remove" />
      </Table.Cell>
    </Table.Row>
  ))
  return (
    <Grid centered={true} padded="vertically" textAlign="center">
      <Grid.Row>
        <Container>
          <Header as="h1" icon={true} textAlign="center">
            <Icon name="book" circular={true} />
            Booker - <i>book your books</i>
          </Header>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Author Date</Table.HeaderCell>
                <Table.HeaderCell>ISBN</Table.HeaderCell>
                <Table.HeaderCell>Pages</Table.HeaderCell>
                <Table.HeaderCell>Rating</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{rows}</Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="6">
                  <Button
                    positive={true}
                    content="Add a book"
                    icon="add"
                    labelPosition="left"
                    floated="left"
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Container>
      </Grid.Row>
    </Grid>
  )
}

export default BookerApp
