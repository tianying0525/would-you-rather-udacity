import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import App from './components/App'
import reducers from './reducers'
import middleware from './middleware'
import { createStore } from 'redux'

const store = createStore(reducers, middleware)

ReactDOM.render(
  <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
)