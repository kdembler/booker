import * as React from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { Dispatch } from 'redux'
import { Button, Form, Grid, Header, Message, Modal, Rating, Segment } from 'semantic-ui-react'

import { isValidField } from '../../common/utils'
import * as actions from '../actions'
import { editFields, errorMessages } from '../constants'
import { Book, BookerAction, BookerDispatch, BookerState, EditState } from '../types'

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
    if (!edit.sending) {
      saveBook(edit.values, isbn)
    }
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
                    loading={edit.sending}
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
  const ok = isValidField(field, value)
  dispatch(actions.changeValidationError(field, !ok))
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

const mapStateToProps = (state: BookerState): BookEditModalStateProps => ({
  edit: state.edit
})

const mapDispatchToProps = (dispatch: BookerDispatch): BookEditModalDispatchProps => ({
  closeModal: () => {
    dispatch(actions.closeEdit())
  },
  onChange: e => {
    const field = e.currentTarget.name
    const value: string = e.currentTarget.value

    validateFieldAndDispatch(field, value, dispatch)

    dispatch(actions.changeValue(field, value))
  },
  onRatingChange: (_, { rating }) => {
    dispatch(actions.changeValue('rating', rating))
  },
  saveBook: (book, isbn) => {
    // check if all fields are valid before saving
    if (!validateAllFieldsAndDispatch(book, dispatch)) {
      return
    }
    dispatch(actions.changeSending(true))
    let action
    if (!isbn) {
      action = actions.addBook(book)
    } else {
      action = actions.editBook(book, isbn)
    }
    dispatch(action)
      .then(() => {
        dispatch(actions.changeSending(false))
        dispatch(actions.closeEdit())
        toast.info(`${book.title} saved!`)
      })
      .catch(({ status }) => {
        dispatch(actions.changeSending(false))
        if (status === 409) {
          // conflicting isbn
          toast.error(`Provided ISBN is already used.`)
        } else {
          toast.error(`Couldn't save the book.\nMaybe try again?`)
        }
      })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookEditModal)
