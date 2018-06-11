import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import BookerApp from './components/BookerApp'
import { initialState } from './constants'
import bookerReducer from './reducers'
import registerServiceWorker from './registerServiceWorker'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any
  }
}

const store = createStore(
  bookerReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <BookerApp />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
