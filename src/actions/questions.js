export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_VOTE = 'ADD_VOTE'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function addVote(authedUser, id, answer) {
  return {
    type: ADD_VOTE,
    authedUser,
    id,
    answer
  }
}

export function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}