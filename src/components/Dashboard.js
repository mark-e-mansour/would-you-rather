import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="col-md-12 mt-3 mb-3">
          <h3 className='text-center'>Dashboard</h3>
        </div>

        <div className='col-md-8 offset-md-2'>
          <div className="card p-3">
            <Tabs fill defaultActiveKey="unanswered" className="mb-3" variant="pills">
              <Tab eventKey="unanswered" title="UnAnswered">
                {this.props.unAnsweredQuestionIds.map((id) => (
                  <div className="card mb-3 bg-dark text-light" key={id}>
                    <Question id={id} />
                  </div>
                ))}
              </Tab>
              <Tab eventKey="answered" title="Answered">
                {this.props.answeredQuestionsIds.map((id) => (
                  <div className="card mb-3 bg-dark text-light" key={id}>
                    <Question id={id} />
                  </div>
                ))}
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  const answeredQuestions = Object.keys(users[authedUser].answers)
  return {
    unAnsweredQuestionIds: Object.keys(questions)
      .filter((id) => !answeredQuestions.includes(id))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestionsIds: Object.keys(questions)
      .filter((id) => answeredQuestions.includes(id))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)