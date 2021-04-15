import { ADD_ANSWER, ASSIGN_QUESTION, RECEIVE_USERS } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }

    case ADD_ANSWER:
      const { authedUser, id, answer } = action
      
      return {
        ...state,
        [authedUser]: users[authedUser],
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [id]: answer
          }
        }
      }

      case ASSIGN_QUESTION:
        return {
          ...state,
          [action.authedUser]: users[action.authedUser],
          [action.authedUser]: {
            ...state[action.authedUser],
            questions: state[action.authedUser].questions.concat([action.id])
          }
        }

    default :
      return state
  }
}