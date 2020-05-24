import React from 'react'
import { connect } from 'react-redux'

class Question extends React.Component {
    render() {
        const { question, author } = this.props;
        return (
            <div>
                <div>{author.name} asks</div>
                <div>
                    <div>
                        <img alt="avatar" src={`/${author.avatarURL}`}/>
                    </div>
                    
                    <div>
                        <div>Would you rather</div>
                        <div>{question.optionOne.text}...</div>
                        <button>View Poll</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
    const question = questions[id]
    const author = question ? users[question.author] : null
  
    return {
        authedUser,
        question,
        author
    }
}

export default connect(mapStateToProps)(Question);