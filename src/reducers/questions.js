import { RECEIVE_QUESTIONS, ADD_VOTE, ADD_QUESTION } from '../actions/questions'

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }

    case ADD_VOTE:
      const { authedUser, id, answer } = action
      let answeredQuestion = {}
      if (answer === 'optionOne') {
        answeredQuestion = {
          [id]: {
            ...state[id],
            optionOne: {
              votes: state[id].optionOne.votes.concat([authedUser]),
              text: state[id].optionOne.text
            }
          }
        }
      }
      else {
        answeredQuestion = {
          [id]: {
            ...state[id],
            optionTwo: {
              votes: state[id].optionTwo.votes.concat([authedUser]),
              text: state[id].optionTwo.text
            }
          }
        }
      }

      return {
        ...state,
        [id]: questions[id],
        ...answeredQuestion
      }

      case ADD_QUESTION:
        const { question } = action
        return {
          ...state,
          [question.id]: question,
        }
    default:
      return state
  }
}