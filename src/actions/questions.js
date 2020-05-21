export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

export function receiveQuestions (tweets) {
  return {
    type: RECEIVE_QUESTIONS,
    tweets,
  }
} 