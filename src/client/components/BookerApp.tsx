import * as React from 'react'
import { Container, Grid, Header, Icon } from 'semantic-ui-react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './BookerApp.css'

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
      <ToastContainer hideProgressBar />
    </div>
  )
}

export default BookerApp
