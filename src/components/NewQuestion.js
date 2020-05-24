import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from  '../actions/questions'

class NewQuestion extends Component {	
	state = {      
    	optionOneText:'',
		optionTwoText:'',
		toHome: false
	};

	handleInputChangeOption1 = (event) => {
		const value = event.target.value;
		this.setState({optionOneText:value})
	}

	handleInputChangeOption2 = (event) => {
		const value = event.target.value;
		this.setState({optionTwoText:value})
	}

	handleSubmit = (event) => {   
    	event.preventDefault();

    	const { dispatch } = this.props
    	const { optionOneText, optionTwoText} = this.state   
    
    	dispatch(handleAddQuestion(
      		optionOneText,
      		optionTwoText
    	))

    	this.setState({
        	optionOneText:'',
			optionTwoText:'',
			toHome: true
      	})
  	}
 
	render() {
		const { toHome } = this.state;

		if (toHome) {
			return <Redirect to='/dashboard' />
		}

		return (
			<div>
				<div>Create New Question</div>
				<form onSubmit={this.handleSubmit}>
					<div>Would you rather...</div>
					<input 
						name="optionOneText"
						type="text"
						placeholder="Enter Option One Text Here"
						value={this.state.optionOneText}
						onChange={this.handleInputChangeOption1} />
					<div>Or</div>
					<input 
						name="optionTwoText"
						type="text"
						placeholder="Enter Option Two Text Here"
						value={this.state.optionTwoText}
						onChange={this.handleInputChangeOption2} />

					<button type="submit" disabled={!this.state.optionOneText || !this.state.optionTwoText}>Submit</button>
				</form>
			</div> 
  		)
	}
}

export default connect()(NewQuestion);