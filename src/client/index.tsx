import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { toast } from 'react-toastify'
import { applyMiddleware, createStore } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'

import * as actions from './actions'
import BookerApp from './components/BookerApp'
import bookerReducer from './reducers'
import registerServiceWorker from './registerServiceWorker'

// Redux Chrome extension
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any
  }
}

const store = createStore(
  bookerReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk as ThunkMiddleware)
)

// fetch initial state
store
  .dispatch(actions.refreshBooks())
  .then(() => store.dispatch(actions.changeFetching(false)))
  .catch(() => toast.error(`Couldn't refresh book list. Maybe try again?`))

ReactDOM.render(
  <Provider store={store}>
    <BookerApp />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
