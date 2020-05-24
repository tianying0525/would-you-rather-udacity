import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard';
import Login from './Login'
import QuestionDetail from './QuestionDetail'
import Leaderboard from './Leaderboard'
import Navbar from './Navbar'
import NewQuestion from './NewQuestion';
import PrivateRoute from './PrivateRoute'
import NotFound from './NotFound'

class App extends React.Component {
  	componentDidMount() {
    	this.props.dispatch(handleInitialData())
	}

	render() {
		return (
			<Router>
				
					<div className='container'>
						<Navbar />
							<div className="main-content"> 
								<Switch>
									<Route path="/" exact component={Login}/>
									<PrivateRoute path='/dashboard' exact component={Dashboard} />
									<PrivateRoute path='/add' exact component={NewQuestion} />
									<PrivateRoute path='/question/:id' component={QuestionDetail} />
									<PrivateRoute path='/leaderboard' component={Leaderboard} />
									<Route path="/not-found" component={NotFound} />
								</Switch>
							</div>
					</div>
			
			</Router>
		)
	}
}

export default connect()(App);
