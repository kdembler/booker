import * as React from 'react'
import { Container, Grid, Header, Icon } from 'semantic-ui-react'

import BookEditModal from './BookEdit'
import BookList from './BookList'

const BookerApp = () => {
  return (
    <div>
      <Grid padded="vertically" centered>
        <Grid.Row>
          <Container>
            <Header as="h1" icon textAlign="center">
              <Icon name="book" circular />
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

export default BookerApp