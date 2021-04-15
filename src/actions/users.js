export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_ANSWER = 'ADD_ANSWER'
export const ASSIGN_QUESTION = 'ASSIGN_QUESTION'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function addAnswer(authedUser, id, answer) {
  return {
    type: ADD_ANSWER,
    authedUser,
    id,
    answer
  }
}

export function assignQuestion(authedUser, id) {
  return {
    type: ASSIGN_QUESTION,
    authedUser,
    id
  }
}