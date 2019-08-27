import {SET_CURRENT_MOVIE, setCurrentMovie} from './actions'
let wow = "wow"


const initialState = {
    currentMovie: null
}

function reducer(state = initialState, action) {

    switch (action.type) {
        case SET_CURRENT_MOVIE:
          return Object.assign({}, state, {
            currentMovie: action.id
          })
        default:
          return state
      }

}


export default reducer;