import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/api'
import { receiveUsers, addAnswer, assignQuestion } from './users'
import { receiveQuestions, addVote, addQuestion } from './questions'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(null))
        dispatch(hideLoading())
      })
  }
}

export function handleLogging(id) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(setAuthedUser(id))
    dispatch(hideLoading())
  }
}

export function handleAnswerQuestion(authedUser, id, answer) {
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestionAnswer({
      authedUser,
      qid: id,
      answer
    })
      .then(() => {
        dispatch(addVote(authedUser, id, answer))
        dispatch(addAnswer(authedUser, id, answer))
      })
      .then(() => dispatch(hideLoading()))
      .catch((e) => {
        console.warn('Error in handleAnswerQuestion: ', e)
        alert('The was an error saving your answer. Try again.')
      })
  }
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {
    dispatch(showLoading())
    const questionObject = { optionOneText, optionTwoText, author }

    return saveQuestion(questionObject)
      .then((question) => {
        dispatch(addQuestion(question))
        dispatch(assignQuestion(author, question.id))
      })
      .then(() => dispatch(hideLoading()))
      .catch((e) => {
        console.warn('Error in handleAddQuestion: ', e)
        alert('The was an error saving your question. Try again.')
      })
  }
}