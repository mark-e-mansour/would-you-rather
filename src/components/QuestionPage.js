import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import PollResult from './PollResult'
import PollSelect from './PollSelect'
import Page404 from './Page404'

class QuestionPage extends Component {
    render() {
        const { question } = this.props

        if (question === null) {
            return <Page404/>
        }

        const { hasAnswered, id } = question

        return (
            <div className="question-page">
                {hasAnswered
                    ? (<PollResult id={id} />)
                    : (<PollSelect id={id} />)}
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, props) {
    const { id } = props.match.params
    const question = questions[id]

    return {
        authedUser,
        question: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null
    }
}

export default connect(mapStateToProps)(QuestionPage)