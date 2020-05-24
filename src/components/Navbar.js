import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Navbar extends React.Component {
    render() {
        const mystyle = {
            display: 'inline',
            margin: '5px'
        };
        const { authedUser } = this.props
        return (

            <nav>
                <ul>
                    <li style={mystyle}>
                        <NavLink to='/dashboard'>
                            Home
                    </NavLink>
                    </li>
                    <li style={mystyle}>
                        <NavLink to='/add'>
                            New Question
                    </NavLink>
                    </li>
                    <li style={mystyle}>
                        <NavLink to='/leaderboard'>
                            Leader Board
                    </NavLink>
                    </li>
                    {
                        authedUser
                        && <li style={mystyle}>
                            <NavLink to='/'>
                                Logout
                            </NavLink>
                        </li>
                    }
                </ul>
            </nav>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    }

}
export default connect(mapStateToProps)(Navbar)