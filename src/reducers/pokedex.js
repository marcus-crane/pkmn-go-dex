import {
  FETCH_POKEDEX_FAILURE,
  FETCH_POKEDEX_REQUEST,
  FETCH_POKEDEX_SUCCESS,
  TOGGLE_CAPTURE_STATUS,
  TOGGLE_HOVERING
} from "../actions/pokedex"

const pokedex = (store = {}, action) => {
  switch(action.type) {
  case FETCH_POKEDEX_REQUEST:
    return fetchPokedexRequest(store)
  case FETCH_POKEDEX_SUCCESS:
    return fetchPokedexSuccess(store, action)
  case FETCH_POKEDEX_FAILURE:
    return fetchPokedexFailure(store, action)
  case TOGGLE_CAPTURE_STATUS:
    return toggleCaptureStatus(store, action)
  case TOGGLE_HOVERING:
    return toggleHovering(store, action)
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

const fetchPokedexFailure = (store, action) => {
  return {
    ...store,
    fetching: false,
    errorMessage: action.errorMessage
  }
}

function toggleCaptureStatus(store, action) {
  const captureStatus = store.pokemon[action.pokemon].captured
  return {
    ...store,
    pokemon: {
      ...store.pokemon,
      [action.pokemon]: {
        ...store.pokemon[action.pokemon],
        captured: !captureStatus
      }
    }
  }
}

function toggleHovering(store, action) {
  return {
    ...store,
    hovering: true,
    ref: action.pokemon
  }
}

export default pokedex