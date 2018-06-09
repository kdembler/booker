import * as React from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Header, Icon } from 'semantic-ui-react'

import { AppState, Book } from '../types'
import BookEditModal from './BookEdit'
import BookList from './BookList'

interface BookerStateProps {
  books?: Book[]
}

const BookerApp: React.SFC<BookerStateProps> = ({ books }) => {
  return (
    <div>
      <Grid padded="vertically" centered={true}>
        <Grid.Row>
          <Container>
            <Header as="h1" icon={true} textAlign="center">
              <Icon name="book" circular={true} />
              Booker - <i>book your books</i>
            </Header>
            <BookList />
          </Container>
        </Grid.Row>
      </Grid>
      <BookEditModal />
    </div>
  )
}

const mapStateToProps = (state: AppState): BookerStateProps => ({
  books: state.books
})

export default connect(mapStateToProps)(BookerApp)
