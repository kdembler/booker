import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Button, Form, Grid, Header, Message, Modal, Rating, Segment } from 'semantic-ui-react'

import { BookerAction } from '../actions/types'
import { editFields, errorMessages } from '../constants'
import { AppState, Book, EditState } from '../types'
import { isValidISBN } from '../utils'

interface BookEditModalStateProps {
  edit: EditState
}

interface BookEditModalDispatchProps {
  closeModal: () => void
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  onRatingChange: (e: React.SyntheticEvent, _: { rating: number }) => void
  saveBook: (book: Book, isbn: string) => void
}

type BookEditModalProps = BookEditModalStateProps & BookEditModalDispatchProps

const BookEditModal: React.SFC<BookEditModalProps> = ({
  edit,
  closeModal,
  onChange,
  onRatingChange,
  saveBook
}) => {
  const isbn = edit.book ? edit.book.isbn : ''

  const onSave = (e: React.FormEvent) => {
    e.preventDefault()
    saveBook(edit.values, isbn)
  }

  const getErrorsList = () => {
    const errors: string[] = []
    editFields.forEach(field => {
      if (edit.errors[field]) {
        errors.push(errorMessages[field])
      }
    })
    return errors
  }

  return (
    <Modal open={edit.open}>
      <Modal.Content>
        <Grid centered textAlign="center">
          <Grid.Column>
            <Segment>
              <Header as="h4" dividing>
                {isbn ? 'Edit a book' : 'Add a new book'}
              </Header>
              <Form onSubmit={onSave} autoComplete="off" error={getErrorsList().length > 0}>
                <Form.Input
                  fluid
                  iconPosition="left"
                  icon="pencil"
                  label="Title"
                  name="title"
                  value={edit.values.title}
                  error={edit.errors.title}
                  onChange={onChange}
                />
                <Form.Input
                  fluid
                  iconPosition="left"
                  icon="user"
                  label="Author"
                  name="author"
                  value={edit.values.author}
                  error={edit.errors.author}
                  onChange={onChange}
                />
                <Form.Input
                  fluid
                  iconPosition="left"
                  icon="id card"
                  label="ISBN"
                  name="isbn"
                  value={edit.values.isbn}
                  error={edit.errors.isbn}
                  onChange={onChange}
                />
                <Form.Input
                  fluid
                  iconPosition="left"
                  icon="book"
                  type="number"
                  label="Pages #"
                  name="pages"
                  value={edit.values.pages}
                  error={edit.errors.pages}
                  onChange={onChange}
                />
                <Form.Field>
                  <label>Rating</label>
                  <Rating
                    icon="star"
                    maxRating={5}
                    size="massive"
                    rating={edit.values.rating}
                    onRate={onRatingChange}
                  />
                </Form.Field>
                <Message error list={getErrorsList()} />
                <Button.Group fluid>
                  <Button type="button" onClick={closeModal}>
                    Discard
                  </Button>
                  <Button.Or />
                  <Button
                    positive
                    type="submit"
                    disabled={getErrorsList().length > 0}
                    onClick={onSave}
                  >
                    Save
                  </Button>
                </Button.Group>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  )
}

const validateFieldAndDispatch = (
  field: string,
  value: string,
  dispatch: Dispatch<BookerAction>
): boolean => {
  let ok = true
  switch (field) {
    case 'pages':
      const parsed = Number.parseFloat(value)
      ok = value !== '' && !Number.isNaN(parsed) && parsed > 0 && Number.isInteger(parsed)
      break
    case 'isbn':
      ok = isValidISBN(value)
      break
    default:
      ok = value.length > 0
      break
  }
  dispatch({
    error: !ok,
    field,
    type: 'EDIT_VALIDATION_ERROR'
  })
  return ok
}

const validateAllFieldsAndDispatch = (values: Book, dispatch: Dispatch<BookerAction>): boolean => {
  let ok = true
  editFields.forEach(field => {
    if (!validateFieldAndDispatch(field, values[field], dispatch)) {
      ok = false
    }
  })
  return ok
}

const mapStateToProps = (state: AppState): BookEditModalStateProps => ({
  edit: state.edit
})

const mapDispatchToProps = (dispatch: Dispatch<BookerAction>): BookEditModalDispatchProps => ({
  closeModal: () => {
    dispatch({
      type: 'EDIT_CLOSE'
    })
  },
  onChange: e => {
    const field = e.currentTarget.name
    const value: string = e.currentTarget.value

    validateFieldAndDispatch(field, value, dispatch)

    dispatch({
      field,
      type: 'EDIT_ONCHANGE',
      value
    })
  },
  onRatingChange: (_, { rating }) => {
    dispatch({
      field: 'rating',
      type: 'EDIT_ONCHANGE',
      value: rating
    })
  },
  saveBook: (book, isbn) => {
    // check if all fields are valid before saving
    if (!validateAllFieldsAndDispatch(book, dispatch)) {
      return
    }
    if (!isbn) {
      dispatch({
        book,
        type: 'BOOK_ADD'
      })
    } else {
      dispatch({
        book,
        isbn,
        type: 'BOOK_EDIT'
      })
    }
    dispatch({
      type: 'EDIT_CLOSE'
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookEditModal)
