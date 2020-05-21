import { receiveQuestions } from './questions'
import { receiveUsers } from './users'
import { setAuthedUser } from './authedUser'
import {getInitialData} from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData (userId) {
    return (dispatch) => {
      dispatch(showLoading())
      return getInitialData()
        .then(({ users, tweets }) => {
          dispatch(receiveUsers(users))
          dispatch(receiveQuestions(tweets))
          dispatch(setAuthedUser(userId ? userId : null))
          dispatch(hideLoading())
        })
    }
  }