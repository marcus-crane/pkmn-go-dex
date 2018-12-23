import {
  FETCH_POKEDEX_REQUEST,
  FETCH_POKEDEX_SUCCESS,
  TOGGLE_CAPTURE_STATUS
} from "../actions/pokedex"

const pokedex = (store = [], action) => {
  switch(action.type) {
  case FETCH_POKEDEX_REQUEST:
    return fetchPokedexRequest(store)
  case FETCH_POKEDEX_SUCCESS:
    return fetchPokedexSuccess(store, action)
  case TOGGLE_CAPTURE_STATUS:
    return toggleCaptureStatus(store, action)
  default:
    return store
  }
}

const fetchPokedexRequest = (store) => {
  return {
    ...store,
    fetching: true
  }
}

const fetchPokedexSuccess = (store, action) => {
  return {
    ...store,
    fetching: false,
    pokemon: action.pokemon
  }
}

function toggleCaptureStatus(store, action) {
  const captureStatus = store.pokedex.pokemon[action.name].caught
  return {
    ...store,
    [action.name]: {
      captured: !captureStatus
    }
  }
}

export default pokedex