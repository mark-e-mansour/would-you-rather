import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }
  handleChangeOptionOne = (e) => {
    const optionOneText = e.target.value

    this.setState(() => ({
      optionOneText
    }))
  }
  handleChangeOptionTwo = (e) => {
    const optionTwoText = e.target.value

    this.setState(() => ({
      optionTwoText
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch, authedUser } = this.props

    dispatch(handleAddQuestion(optionOneText, optionTwoText, authedUser))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true,
    }))
  }
  render() {
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div className="new-question">
        <div className="col-md-12 mt-3 mb-3">
          <h3 className='text-center'>Compose new poll question</h3>
        </div>
        <div className="card mt-3 bg-dark text-light col-md-8 offset-md-2">
          <div className="card-header">
            <h4 className='center'>Would you rather?</h4>
          </div>
          <div className="card-body">
            <form className='p-3' onSubmit={this.handleSubmit}>
              <div className="col-md-12">
                <input
                  type="text"
                  placeholder="First option"
                  value={optionOneText}
                  onChange={this.handleChangeOptionOne}
                  className='form-control'
                  maxLength={280}
                />
            <p className="mt-2 mb-2 text-center">OR</p>
            <input
                  type="text"
                  placeholder="Second option"
                  value={optionTwoText}
                  onChange={this.handleChangeOptionTwo}
                  className='form-control'
                  maxLength={280}
                />
                <button
                  className='btn btn-success btn-block mt-5'
                  type='submit'
                  disabled={optionOneText === '' || optionTwoText === ''}>
                  Submit
          </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {

  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion)