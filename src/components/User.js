import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class User extends Component {
    render() {
        const { user } = this.props
        const { name, avatarURL, answers, questions } = user
        const totalAnswers = Object.keys(answers).length
        const totalQuestions = questions.length
        const score = totalAnswers + totalQuestions
        return (
            <Fragment>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3 avatar-div">
                            <img
                                src={avatarURL}
                                alt={`Avatar of ${name}`}
                                className='avatar'
                            />
                        </div>

                        <div className="col-md-5 offset-md-1">
                            <h4><strong>{name}</strong></h4>
                            <hr/>
                            <p>Answered questions  {totalAnswers}</p>
                            <p>Created questions  {totalQuestions}</p>
                        </div>

                        <div className="col-md-3">
                            <div className="card text-white bg-success h-100">
                                <div className="card-header text-center">Score</div>
                                <div className="card-body text-center">
                                   <h3>{score}</h3> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps({ users }, { id }) {
    const user = users[id]
    return {
        user
    }
}

export default connect(mapStateToProps)(User)