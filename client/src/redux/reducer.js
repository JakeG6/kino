import {SET_CURRENT_MOVIE, setCurrentMovie} from './actions'


const initialState = {
    currentMovie: null
}

export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_CURRENT_MOVIE:
          return Object.assign({}, state, {
            currentMovie: action.id
          })
        default:
          return state
      }

}

