
export const pollsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_POLLS':
      return action.polls
    default:
      return state
  }
}

export const loaderReducer = (state = '', action) => {
  switch (action.type) {
    case 'TOGGLE_LOADER':
      return state ? '' : 'Loading...'
    default:
      return state
  }
}
