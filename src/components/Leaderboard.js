import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'

class Leaderboard extends Component {
    render() {
        return (
            <div className="leaderboard">
                <div className="col-md-12 mt-3 mb-3">
                    <h3 className='text-center'>Leaderboard</h3>
                </div>
                {this.props.userIds.map((id) => (
                    <div className="card mb-3 col-md-6 offset-md-3 text-white bg-dark" key={id}>
                        <User id={id} />
                    </div>
                ))}
            </div >
        )
    }
}

function mapStateToProps({ users }) {
    return {
        userIds: Object.keys(users).sort((a, b) =>
            (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length)
        )
    }
}

export default connect(mapStateToProps)(Leaderboard)