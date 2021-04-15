import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { handleAnswerQuestion } from '../actions/shared'

class PollSelect extends Component {
    state = {
        answer: 'optionOne'
    }
    handleChange = (e) => {
        this.setState({
            answer: e.target.value
        });
    }
    handleSubmitAnswer = (e) => {
        e.preventDefault()
        const { answer } = this.state
        const { dispatch, id, authedUser } = this.props
        dispatch(handleAnswerQuestion(authedUser, id, answer))
    }
    render() {
        const { answer } = this.state
        const { question } = this.props
        const { name, avatar, optionOne, optionTwo } = question

        if (question === null) {
            return <p>This Question doesn't existd</p>
        }

        return (
            <div className="poll-select col-md-6 offset-md-3">
                <div className="card mt-3 bg-dark text-light">
                    <div className="card-header">{name} asks:</div>
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
                                <h4>Would you rather ?</h4>
                                <form onSubmit={this.handleSubmitAnswer}>
                                    <div className="form-check pt-2 pb-2">
                                        <input className="form-check-input" name="answer" type="radio" id="option1" value="optionOne" checked={answer === 'optionOne'} onChange={this.handleChange} />
                                        <label className="form-check-label" htmlFor="option1">
                                            {optionOne.text}
                                        </label>
                                    </div>
                                    <div className="form-check pt-2 pb-2">
                                        <input className="form-check-input" name="answer" type="radio" id="option2" value="optionTwo" checked={answer === 'optionTwo'} onChange={this.handleChange} />
                                        <label className="form-check-label" htmlFor="option2">
                                            {optionTwo.text}
                                        </label>
                                    </div>
                                    <button type="submit" className="mt-3 btn btn-success btn-block">Submit</button>
                                </form>

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
    return {
        authedUser,
        question: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null
    }
}


export default connect(mapStateToProps)(PollSelect)