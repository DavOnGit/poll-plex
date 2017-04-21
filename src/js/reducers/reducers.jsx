export var authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        ...action.usrData
      }
    case 'LOGOUT':
      return {}
    default:
      return state
  }
}

export const pollsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_POLLS':
      return action.polls
    case 'ADD_POLL':
      return [
        ...state,
        action.poll
      ]
    case 'ADD_VOTE':
      return state.map(poll => {
        if (poll.id === action.id) {
          const options = { ...poll.options, ...action.updates }
          return {
            ...poll,
            options
          }
        } else return poll
      })
    case 'DELETE_POLL':
      return state.filter(poll => poll.id !== action.id)
    default:
      return state
  }
}

export const loaderReducer = (state = false, action) => {
  switch (action.type) {
    case 'START_FETCHING':
      return !state
    case 'END_FETCHING':
      return !state
    default:
      return state
  }
}
