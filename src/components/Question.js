import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
  toParent = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/questions/${id}`)
  }
  
  render() {
    const { question } = this.props

    if (question === null) {
      return <p>This Question doesn't existd</p>
    }

    const { name, avatar, optionOne, id } = question

    return (
      <Fragment>
        <div className="card-header"><strong>{name} asks:</strong></div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 avatar-div">
              <img
                src={avatar}
                alt={`Avatar of ${name}`}
                className='avatar'
              />
            </div>

            <div className='col-md-8'>
              <strong>Would you Rather</strong>
              <p>.. {optionOne.text}</p>
              <Link to={`/questions/${id}`} className='btn btn-outline-primary btn-block btn-sm'>View Poll</Link>
            </div>
          </div>
        </div>
      </Fragment>
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

export default withRouter(connect(mapStateToProps)(Question))