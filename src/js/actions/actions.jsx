import { firebaseRef, default as firebase } from '../firebase/'
import { batchActions } from 'redux-batched-actions'
import moment from 'moment'

/* ------------------------------------
--> Actions
------------------------------------ */

export const setPolls = (polls) => {
  return {
    type: 'SET_POLLS',
    polls
  }
}

export const toggleLoader = () => {
  return {
    type: 'TOGGLE_LOADER'
  }
}

export const fetchPolls = () => {
  return (dispatch, getState) => {
    const pollsRef = firebaseRef.child('polls')

    return pollsRef.once('value').then(polls => {
      const pollsObj = polls.val()

      const pollsArr = Object.keys(pollsObj).map(key => (
        {
          ...pollsObj[key],
          id: key
        }
      ))
      console.log(pollsArr)
      const _actions = [
        toggleLoader(),
        setPolls(pollsArr)
      ]
      dispatch(batchActions(_actions))
    })
  }
}
