import * as React from 'react'
import * as ReactDOM from 'react-dom'

import BookerApp from './components/BookerApp'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<BookerApp />, document.getElementById('root') as HTMLElement)
registerServiceWorker()
