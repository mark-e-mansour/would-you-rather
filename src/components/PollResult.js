import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import ProgressBar from 'react-bootstrap/ProgressBar'

class PollResult extends Component {
    render() {
        const { question, selected } = this.props

        if (question === null) {
            return <p>This Question doesn't existd</p>
        }

        const { name, avatar, optionOne, optionTwo } = question
        const questionOneVotes = optionOne.votes.length
        const questionTwoVotes = optionTwo.votes.length
        const total = questionOneVotes + questionTwoVotes
        const questionOnePercentage = total !== 0 ? Math.round((questionOneVotes / total) * 100) : questionOneVotes
        const questionTwoPercentage = total !== 0 ? Math.round((questionTwoVotes / total) * 100) : questionTwoVotes

        const optionOneCardClass = selected === "optionOne"
            ? "card p-3 mb-3 bg-success text-light"
            : "card p-3 mb-3 text-dark"

        const optionTwoCardClass = selected === "optionTwo"
            ? "card p-3 mb-3 bg-success text-light"
            : "card p-3 mb-3 text-dark"

        const optionOneBadge = selected === "optionOne"
            ? <div id="answer-badge" className="badge badge-warning">Your<br />answer</div>
            : <div></div>

        const optionTwoBadge = selected === "optionTwo"
            ? <div id="answer-badge" className="badge badge-warning">Your<br />answer</div>
            : <div></div>

        return (
            <div className="poll-result col-md-6 offset-md-3">
                <div className="card mt-3 bg-dark text-light">
                    <div className="card-header">Asked by {name}</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4 avatar-div">
                                <img
                                    src={avatar}
                                    alt={`Avatar of ${name}`}
                                    className='avatar'
                                />
                            </div>
                            <div className="col-md-8">
                                <div className={optionOneCardClass}>
                                    {optionOneBadge}
                                    <h4>Would you rather {optionOne.text}?</h4>
                                    <ProgressBar animated now={questionOnePercentage} label={`${questionOnePercentage}%`} />
                                    {total !== 0
                                        ? (<p className="mt-3 text-center">{questionOneVotes} out of {total} votes</p>)
                                        : (<p className="mt-3 text-center">0 Votes</p>)}
                                </div>
                                <div className={optionTwoCardClass}>
                                    {optionTwoBadge}
                                    <h4>Would you rather {optionTwo.text}?</h4>
                                    <ProgressBar animated now={questionTwoPercentage} label={`${questionTwoPercentage}%`} />
                                    {total !== 0
                                        ? (<p className="mt-3 text-center">{questionTwoVotes} out of {total} votes</p>)
                                        : (<p className="mt-3 text-center">0 Votes</p>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    const selected = users[authedUser].answers[id]
    return {
        authedUser,
        question: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null,
        selected
    }
}

export default connect(mapStateToProps)(PollResult)