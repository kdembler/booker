import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Header, Icon, Loader, Rating, Table } from 'semantic-ui-react'

import * as actions from '../actions'
import { Book, BookerDispatch, BookerState } from '../types'

interface BookListStateProps {
  books: Book[]
  fetching: boolean
}

interface BookListDispatchProps {
  editBook: (_?: Book) => void
  removeBook: (_: Book) => void
  refreshBooks: () => void
}

type BookListProps = BookListStateProps & BookListDispatchProps

const BookList: React.SFC<BookListProps> = ({
  books,
  fetching,
  editBook,
  removeBook,
  refreshBooks
}) => {
  const onAdd = () => editBook(undefined)
  const onRefresh = () => !fetching && refreshBooks()
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
            <Table.HeaderCell colSpan="6">
              {addButton}
              <Button
                floated="right"
                icon
                color="blue"
                labelPosition="left"
                loading={fetching}
                onClick={onRefresh}
              >
                <Icon name="refresh" />
                Refresh
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  } else {
    const noBooks = (
      <div>
        <Header as="h3">No books yet. Maybe add one?</Header>
        {addButton}
      </div>
    )
    return (
      <div>
        <Loader size="big" inline active={fetching}>
          Fetching books...
        </Loader>
        {!fetching && noBooks}
      </div>
    )
  }
}

const mapStateToProps = (state: BookerState): BookListStateProps => ({
  books: state.books.list,
  fetching: state.books.fetching
})

const mapDispatchToProps = (dispatch: BookerDispatch): BookListDispatchProps => ({
  editBook: book => {
    dispatch(actions.openEdit(book))
  },
  refreshBooks: () => {
    dispatch(actions.refreshBooks())
  },
  removeBook: book => {
    dispatch(actions.removeBook(book))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookList)
