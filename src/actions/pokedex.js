import {
  POKEDEX_URI
} from "../constants"

export const FETCH_POKEDEX_FAILURE = "FETCH_POKEDEX_FAILURE"
export const FETCH_POKEDEX_REQUEST = "FETCH_POKEDEX_REQUEST"
export const FETCH_POKEDEX_SUCCESS = "FETCH_POKEDEX_SUCCESS"
export const TOGGLE_CAPTURE_STATUS = "TOGGLE_CAPTURE_STATUS"

export const fetchPokedexRequest = () => {
  return {
    type: FETCH_POKEDEX_REQUEST
  }
}

export const fetchPokedexSuccess = (pokemon) => {
  return {
    type: FETCH_POKEDEX_SUCCESS,
    pokemon
  }
}

export const fetchPokedexFailure = () => {
  return {
    type: FETCH_POKEDEX_FAILURE
  }
}

export const fetchPokedex = () => {
  return dispatch => {
    dispatch(fetchPokedexRequest())
    return fetch(POKEDEX_URI)
      .then(res => {
        if (res.status !== 200) {
          return Promise.reject()
        }
        return res.json()
      })
      .then(data => dispatch(fetchPokedexSuccess(data)))
      .catch(error => dispatch(fetchPokedexFailure(error)))
  }
}

export const toggleCaptureStatus = pokemon => {
  return {
    type: TOGGLE_CAPTURE_STATUS,
    pokemon
  }
}
