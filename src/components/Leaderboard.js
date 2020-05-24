import React from 'react'
import { connect } from 'react-redux'

class Leaderboard extends React.Component {
    render() {
        const { users} = this.props
        const sortedUsers = users.sort( (a, b) => b.totalScore - a.totalScore)

        return (
            <ul>
            {sortedUsers.map((user) => (
                <li key={user.id}>
                    <div>
                    <div>
                        <img alt="avatar" src={`/${user.avatarURL}`}/>
                    </div>
                    <div>
                        <div>{user.name}</div>
                        <div>
                            <span>Answered questions</span>
                            <span>{Object.keys(user.answers).length}</span>
                        </div>
                        <div>
                            <span>Created questions</span>
                            <span>{user.questions.length}</span>
                        </div>
                    </div>
                    <div>
                        <div>Total Score</div>
                        <div>{user.totalScore}</div>
                    </div>
                    </div>
                </li>
            ))}
            </ul>
        )
    }
}

function mapStateToProps( { users }) {
    const usersList = Object.values(users)
    usersList.map( (user) => user.totalScore = Object.keys(user.answers).length + user.questions.length )
    return {
        users: usersList
    }
}

export default connect(mapStateToProps)(Leaderboard);