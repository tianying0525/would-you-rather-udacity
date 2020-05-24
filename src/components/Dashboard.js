import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
//import QuestionTile from './QuestionTile'
import Question from './Question'

class Dashboard extends React.Component {
    state = {
        showAnswered: false
    }

    filterQuestionsUnanswered = () => {
        this.setState({showAnswered: false })   
    }

    filterQuestionsAnswered = () => {
        this.setState({showAnswered: true })   
    }

    render() {
        const { showAnswered } = this.state;
        const { questions, authedUser } = this.props
        const questionsArray = Object.values(questions)
        const filteredQuestions = questionsArray.filter(function(question) {
            const contains = (
                question.optionOne.votes.indexOf(authedUser) > -1 ||
                question.optionTwo.votes.indexOf(authedUser) > -1
            );
            return showAnswered ? contains : !contains;
        });
        const sortedQuestions = filteredQuestions.sort((a, b) => b.timestamp - a.timestamp);
        return (
            <div>
                <div className="btn-group">
                    <button  onClick={this.filterQuestionsUnanswered}>Unanswered Questions</button>
                    <button onClick={this.filterQuestionsAnswered}>Answered Questions</button>
                </div>

                <ul className="questions-list">
                    {sortedQuestions.map((question) => (
                        <li key={question.id}>
                            <Link to={`question/${question['id']}`}>
                                <Question id={question.id}/>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps( { questions, authedUser }) {
    return {
        authedUser,
        questions,
    }
}

export default connect(mapStateToProps)(Dashboard);