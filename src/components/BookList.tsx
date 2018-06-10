import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Button, Rating, Table } from 'semantic-ui-react'

import { BookerAction } from '../actions/types'
import { AppState, Book } from '../types'

interface BookListStateProps {
  books?: Book[]
}

interface BookListDispatchProps {
  editBook: (_: Book) => void
  removeBook: (_: Book) => void
}

type BookListProps = BookListStateProps & BookListDispatchProps

const BookList: React.SFC<BookListProps> = ({ books, editBook, removeBook }) => {
  const rows = books!.map(book => {
    const edit = () => editBook(book)
    const remove = () => removeBook(book)
    return (
      <Table.Row key={book.isbn}>
        <Table.Cell>{book.title}</Table.Cell>
        <Table.Cell>{book.author}</Table.Cell>
        <Table.Cell>{book.isbn}</Table.Cell>
        <Table.Cell>{book.pages}</Table.Cell>
        <Table.Cell>
          <Rating maxRating={5} rating={book.rating} disabled={true} icon="star" />
        </Table.Cell>
        <Table.Cell width="2">
          <Button color="blue" icon="edit" onClick={edit} />
          <Button color="red" icon="remove" onClick={remove} />
        </Table.Cell>
      </Table.Row>
    )
  })
  return (
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
  )
}

const mapStateToProps = (state: AppState): BookListStateProps => ({
  books: state.books
})

const mapDispatchToProps = (dispatch: Dispatch<BookerAction>): BookListDispatchProps => ({
  editBook: (book: Book) => {
    dispatch({ type: 'OPEN_EDIT', book })
  },
  removeBook: (book: Book) => {
    dispatch({
      book,
      type: 'REMOVE_BOOK'
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookList)
