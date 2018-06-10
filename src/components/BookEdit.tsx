import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Button, Form, Grid, Header, Modal, Rating, Segment } from 'semantic-ui-react'

import { BookerAction } from '../actions/types'
import { AppState, Book } from '../types'

interface BookEditModalStateProps {
  isbn: string
  open: boolean
  values: Book
}

interface BookEditModalDispatchProps {
  closeModal: () => void
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  onRatingChange: (e: React.SyntheticEvent, _: { rating: number }) => void
  saveBook: (book: Book, isbn: string) => void
}

type BookEditModalProps = BookEditModalStateProps & BookEditModalDispatchProps

const BookEditModal: React.SFC<BookEditModalProps> = ({
  isbn,
  open,
  values,
  closeModal,
  onChange,
  onRatingChange,
  saveBook
}) => {
  const onSave = (e: React.FormEvent) => {
    e.preventDefault()
    saveBook(values, isbn)
  }

  return (
    <Modal open={open}>
      <Modal.Content>
        <Grid centered={true} textAlign="center">
          <Grid.Column>
            <Segment>
              <Header as="h4" dividing={true}>
                {isbn ? 'Edit a book' : 'Add a new book'}
              </Header>
              <Form onSubmit={onSave}>
                <Form.Input
                  fluid={true}
                  iconPosition="left"
                  icon="user"
                  label="Title"
                  name="title"
                  value={values.title}
                  onChange={onChange}
                />
                <Form.Input
                  fluid={true}
                  iconPosition="left"
                  icon="user"
                  label="Author"
                  name="author"
                  value={values.author}
                  onChange={onChange}
                />
                <Form.Input
                  fluid={true}
                  iconPosition="left"
                  icon="user"
                  label="ISBN"
                  name="isbn"
                  value={values.isbn}
                  onChange={onChange}
                />
                <Form.Input
                  fluid={true}
                  iconPosition="left"
                  icon="user"
                  type="number"
                  label="Pages #"
                  name="pages"
                  value={values.pages}
                  onChange={onChange}
                />
                <Form.Field>
                  <label>Rating</label>
                  <Rating
                    icon="star"
                    maxRating={5}
                    size="huge"
                    rating={values.rating}
                    onRate={onRatingChange}
                  />
                </Form.Field>
                <Button.Group fluid={true}>
                  <Button type="button" onClick={closeModal}>
                    Discard
                  </Button>
                  <Button.Or />
                  <Button positive={true} type="submit" onClick={onSave}>
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

const mapStateToProps = (state: AppState): BookEditModalStateProps => ({
  isbn: state.edit.book ? state.edit.book.isbn : '',
  open: state.edit.open,
  values: state.edit.values
})

const mapDispatchToProps = (dispatch: Dispatch<BookerAction>): BookEditModalDispatchProps => ({
  closeModal: () => {
    dispatch({
      type: 'CLOSE_EDIT'
    })
  },
  onChange: e => {
    dispatch({
      field: e.currentTarget.name,
      type: 'ONCHANGE_EDIT',
      value: e.currentTarget.value
    })
  },
  onRatingChange: (_, { rating }) => {
    dispatch({
      field: 'rating',
      type: 'ONCHANGE_EDIT',
      value: rating
    })
  },
  saveBook: (book, isbn) => {
    if (!isbn) {
      dispatch({
        book,
        type: 'ADD_BOOK'
      })
    } else {
      dispatch({
        book,
        isbn,
        type: 'EDIT_BOOK'
      })
    }
    dispatch({
      type: 'CLOSE_EDIT'
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookEditModal)
