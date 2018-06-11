import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Button, Header, Rating, Table } from 'semantic-ui-react'

import { BookerAction } from '../actions/types'
import { AppState, Book } from '../types'

interface BookListStateProps {
  books: Book[]
}

interface BookListDispatchProps {
  editBook: (_?: Book) => void
  removeBook: (_: Book) => void
}

type BookListProps = BookListStateProps & BookListDispatchProps

const BookList: React.SFC<BookListProps> = ({ books, editBook, removeBook }) => {
  const onAdd = () => editBook(undefined)
  const addButton = (
    <Button positive content="Add a book" icon="add" labelPosition="left" onClick={onAdd} />
  )
  if (books.length > 0) {
    const rows = books.map(book => {
      const onEdit = () => editBook(book)
      const onRemove = () => removeBook(book)
      return (
        <Table.Row key={book.isbn}>
          <Table.Cell>{book.title}</Table.Cell>
          <Table.Cell>{book.author}</Table.Cell>
          <Table.Cell>{book.isbn}</Table.Cell>
          <Table.Cell>{book.pages}</Table.Cell>
          <Table.Cell>
            <Rating maxRating={5} rating={book.rating} disabled icon="star" />
          </Table.Cell>
          <Table.Cell width="2">
            <Button color="blue" icon="edit" onClick={onEdit} />
            <Button color="red" icon="remove" onClick={onRemove} />
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
            <Table.HeaderCell colSpan="6">{addButton}</Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  } else {
    return (
      <div>
        <Header as="h3">No books yet. Maybe add one?</Header>
        {addButton}
      </div>
    )
  }
}

const mapStateToProps = (state: AppState): BookListStateProps => ({
  books: state.books
})

const mapDispatchToProps = (dispatch: Dispatch<BookerAction>): BookListDispatchProps => ({
  editBook: book => {
    dispatch({ type: 'EDIT_OPEN', book })
  },
  removeBook: book => {
    dispatch({
      book,
      type: 'BOOK_REMOVE'
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookList)
