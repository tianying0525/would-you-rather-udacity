import React from 'react';
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { setAuthedUser, clearAuthedUser } from '../actions/authedUser';

class Login extends React.Component {
	state = {
		userId: null,
		isLoggin: false,
	}
	
	handleSelectionChanged = (event) => {
		const userId = event.target.value;

		this.setState({
			userId : userId
		})
	}
	
	handleLogin = () => {
		const { userId } = this.state;
		const { dispatch } = this.props;
	
		dispatch(setAuthedUser(userId));
	
		this.setState({
			isLoggin : true
		})
	}
	
	componentDidMount() {
		this.props.dispatch(clearAuthedUser())
	}

    render() {
		const { userId, isLoggin } = this.state;
		const { users } = this.props;
		const { from } = this.props.location.state || { from: { pathname: '/dashboard'}}
		const selected = userId ? userId : -1

		//if authenticated
		if(isLoggin) {
			return <Redirect to={from} />
		}
        
        return (
		    <div>
		        <div>Welcome To Would You Rather App</div>
		        <div>
					<div>Please sign in to continue</div>
					<select value={selected} onChange={this.handleSelectionChanged}>
						<option value="-1" disabled>Select user...</option>
						{Object.keys(users).map(function(key) {
							return (
								<option value={users[key].id} key={key}>
									{users[key].name}
								</option>
							);
						})}
					</select>
				</div>

				<button
					disabled={userId === null}
					onClick={this.handleLogin}>
					Login
				</button>
          </div>
		);  
    }
}

function mapStateToProps ({users}) {  
    return {
      users,
    };
  }

export default withRouter(connect(mapStateToProps)(Login));