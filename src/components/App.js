import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute'

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            {/* <Route path='/' component={Login}/> */}
            <Route path='/' component={Dashboard} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default connect()(App)