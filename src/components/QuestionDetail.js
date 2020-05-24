import React from 'react';
import { connect } from 'react-redux'
import { handleAddAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom';

class QuestionDetail extends React.Component {
    state = {
        selectedAnswer: ''
    }
    handleSaveAnswer = (e) => {
        e.preventDefault()

        const { dispatch, authedUser, id  } = this.props
        const { selectedAnswer } = this.state
    
        dispatch(handleAddAnswer({
          qid:id,
          authedUser,
          answer: selectedAnswer,
        }))
    }
    chooseAnswerOne = () => {
        this.setState( {selectedAnswer: 'optionOne'
        })
    }

    chooseAnswerTwo = () => {
        this.setState( {selectedAnswer: 'optionTwo'
        })
    }
    render() {
        const { question, author, answered, votesOptionOne, votesOptionTwo, totalVotes, percentageOptionOne, percentageOptionTwo } = this.props;
        const { selectedAnswer } = this.state;

        if (!question) {
            return <Redirect to="/not-found"/>
        }
        const noSelected ={
            backgroundColor: 'white'
        }

        const Selected ={
            backgroundColor: 'green'
        }

        return (
            <div>
            {answered ? (
                    <div>Asked by {author.name}</div>
                ) : (
                    <div>{author.name} asks</div>
                )}
                <div>
                    <div>
                        <img alt="avatar" className="avatar" src={`/${author.avatarURL}`}/>
                    </div>
                    
                    {!answered ? (
                        <div>
                            <div>Would you rather</div>
                            <div style = {selectedAnswer === 'optionOne' ? Selected : noSelected} onClick={this.chooseAnswerOne}>{question.optionOne.text}</div>
                            <div style = {selectedAnswer === 'optionTwo' ? Selected : noSelected} onClick={this.chooseAnswerTwo}>{question.optionTwo.text}</div>
                            <button disabled={!this.state.selectedAnswer} onClick={this.handleSaveAnswer}>Submit</button>
                        </div>
                    ): (
                        <div>
                            <div>Results: </div>
                            <div style = {selectedAnswer === 'optionOne' ? Selected : noSelected}>
                                <div>{question.optionOne.text}</div>

                                <div>
                                    <div>{votesOptionOne} out of {totalVotes} votes</div>
                                    <div>Percentage votes: {percentageOptionOne}%</div>
                                </div>
                            </div>

                            <div style = {selectedAnswer === 'optionTwo' ? Selected : noSelected}>
                                <div>{question.optionTwo.text}</div>

                                <div>
                                    <div>{votesOptionTwo} out of {totalVotes} votes</div>
                                    <div>Percentage votes: {percentageOptionTwo}%</div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, { match }) {
    const { id } = match.params
    const question = questions[id]
    const author = question ? users[question.author] : null
    const answered = question ? (question.optionOne.votes.indexOf(authedUser) > -1 || question.optionTwo.votes.indexOf(authedUser) > -1) : false
    const votesOptionOne = (question && question.optionOne.votes) ? question.optionOne.votes.length : 0
    const votesOptionTwo = (question && question.optionTwo.votes) ? question.optionTwo.votes.length : 0
    const totalVotes = votesOptionOne + votesOptionTwo
    const percentageOptionOne = ((votesOptionOne / totalVotes) * 100).toFixed(1)
    const percentageOptionTwo = ((votesOptionTwo / totalVotes) * 100).toFixed(1)

    const answer = users[authedUser].answers[id]
  
    return {
        id,
        authedUser,
        question,
        author,
        answered,
        answer,
        votesOptionOne,
        votesOptionTwo,
        totalVotes,
        percentageOptionOne,
        percentageOptionTwo
    }
}

export default connect(mapStateToProps)(QuestionDetail);