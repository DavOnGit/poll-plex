import { firebaseRef, facebookProvider, default as firebase } from '../firebase/'
import { batchActions } from 'redux-batched-actions'
import moment from 'moment'
import { history } from '../'

/* ------------------------------------
--> Actions
------------------------------------ */

export const startFetching = () => {
  return {
    type: 'START_FETCHING'
  }
}

export const endFetching = () => {
  return {
    type: 'END_FETCHING'
  }
}

export const setPolls = (polls) => {
  return {
    type: 'SET_POLLS',
    polls
  }
}

export const fetchPolls = () => {
  return (dispatch, getState) => {
    dispatch(startFetching())
    const pollsRef = firebaseRef.child('polls')

    return pollsRef.once('value').then(polls => {
      const pollsObj = polls.val()

      const pollsArr = Object.keys(pollsObj).map(key => (
        {
          ...pollsObj[key],
          id: key
        }
      ))
      console.log('pollsArr:', pollsArr)
      const _actions = [
        endFetching(),
        setPolls(pollsArr)
      ]
      dispatch(batchActions(_actions))
    })
    .catch((error) => {
      console.log('Action Fetching catch an error along the chain, see details: ', error)
      window.alert('Ops...\n\nInternal error, try reload please....')
    })
  }
}

export const addPoll = (poll) => {
  return {
    type: 'ADD_POLL',
    poll
  }
}

export const startAddPoll = (poll) => {
  return (dispatch, getState) => {
    dispatch(startFetching())
    const { polls, auth } = getState()
    const pollsArr = polls.filter((el) => el.title === poll.title)

    if (pollsArr.length > 0) {
      window.alert('Sorry but this poll name name is taken')
      return null
    }
    poll.createdAt = moment().unix()
    poll.owner = auth.uid

    const pollRef = firebaseRef.child('polls').push(poll)

    return pollRef.then(() => {
      console.log(pollRef.key)
      const actions = [
        endFetching(),
        addPoll({ ...poll, id: pollRef.key })
      ]
      dispatch(batchActions(actions))
      const path = `/poll/${pollRef.key}`
      history.push(path)
    })
  }
}

export const addVote = (id, updates) => {
  return {
    type: 'ADD_VOTE',
    id,
    updates
  }
}

export const startAddVote = (id, voteName, votes) => {
  return (dispatch, getState) => {
    dispatch(startFetching())
    const updates = { [voteName]: votes }
    const pollRef = firebaseRef.child(`polls/${id}/options`)

    return pollRef.update(updates).then(() => {
      const actions = [
        endFetching(),
        addVote(id, updates)
      ]
      dispatch(batchActions(actions))
    })
  }
}

export var deletePoll = (id) => {
  return {
    type: 'DELETE_POLL',
    id
  }
}

export const startDeletePoll = (pollId, uid, path) => {
  return (dispatch, getState) => {
    dispatch(startFetching())
    const todoRef = firebaseRef.child(`polls/${pollId}`)

    return todoRef.remove()
      .then(() => {
        const actions = [deletePoll(pollId), endFetching()]
        dispatch(batchActions(actions))
        if (path === `/poll/${pollId}`) { history.push('/mypolls') }
      })
      .catch((error) => window.alert(`Remove todo failed, please try again\nError: ${error.message}`))
  }
}

export const login = (usrData) => {
  window.localStorage.setItem('uid', usrData.uid)
  return {
    type: 'LOGIN',
    usrData
  }
}

export const startLogin = (provider) => {
  return (dispatch, getState) => {
    switch (provider) {
      case 'facebook':
        return (
          firebase.auth().signInWithPopup(facebookProvider).then(
            (result) => console.log('Auth facebook ok!', result),
            (error) => {
              console.log(error)
            }
          )
        )
      default:
        throw new Error("Provider doesn't match")
    }
  }
}

export var logout = () => {
  window.localStorage.removeItem('uid')
  return {
    type: 'LOGOUT'
  }
}

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut()
      .then(() => { console.log('Logged out!') })
      .catch((error) => console.log(`Logout failed, please try again\nError: ${error.message}`))
  }
}
