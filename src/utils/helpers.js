export function formatQuestion (question, author, authedUser) {
  const { id, optionOne, optionTwo, timestamp } = question
  const { name, avatarURL } = author

  return {
    name,
    id,
    timestamp,
    avatar: avatarURL,
    hasAnswered: optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser),
    optionOne: {
      votes: optionOne.votes,
      text: optionOne.text,
    },
    optionTwo: {
      votes: optionTwo.votes,
      text: optionTwo.text,
    }
  }
}