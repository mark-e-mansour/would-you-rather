import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData, handleLogging } from '../actions/shared'
import Dashboard from './Dashboard'
import Login from './Login'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import Nav from './Nav'
import Leaderboard from './Leaderboard'
import QuestionPage from './QuestionPage'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  handleLogOut = (e) => {
    e.preventDefault()
    const { dispatch } = this.props

    dispatch(handleLogging(null))
  }
  render() {
    const authedUserName = this.props.loading === true ? '' : this.props.users[this.props.authedUser].name
    const authedUserAvatar = this.props.loading === true ? '' : this.props.users[this.props.authedUser].avatarURL
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            {this.props.loading === true
              ? <Fragment><Login /></Fragment>
              : <Fragment>
                <Nav authedUserName={authedUserName} avatar={authedUserAvatar} handleLogOut={this.handleLogOut} />
                <Route path='/' exact component={Dashboard} />
                <Route path='/leaderboard' component={Leaderboard} />
                <Route path='/questions/:id' component={QuestionPage} />
                <Route path='/new' component={NewQuestion} />
              </Fragment>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    loading: authedUser === null,
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(App)