import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import * as actions from "./pokedex"
import fetchMock from "fetch-mock"
import expect from "expect"
import { MOCK_POKEDEX_ENTRY } from "../constants"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("regular actions", () => {
  it("should create FETCH_POKEDEX_REQUEST to begin fetching pokemon data", () => {
    const expectedAction = { type: actions.FETCH_POKEDEX_REQUEST }
    expect(actions.fetchPokedexRequest()).toEqual(expectedAction)
  })

  it("should create FETCH_POKEDEX_SUCCESS upon successfully fetching pokemon data", () => {
    const pokemon = MOCK_POKEDEX_ENTRY
    const expectedAction = {
      type: actions.FETCH_POKEDEX_SUCCESS,
      pokemon
    }
    expect(actions.fetchPokedexSuccess(pokemon)).toEqual(expectedAction)
  })

  it("should create FETCH_POKEDEX_FAILURE upon failing to fetch pokemon data", () => {
    const error = "Something broke"
    const expectedAction = {
      type: actions.FETCH_POKEDEX_FAILURE,
      error
    }
    expect(actions.fetchPokedexFailure(error)).toEqual(expectedAction)
  })
})

describe("async actions", () => {

  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it("should create FETCH_POKEDEX_SUCCESS when fetching pokemon succeeds", () => {
    fetchMock
      .getOnce("/pokedex.json", { body: MOCK_POKEDEX_ENTRY })

    const expectedActions = [
      { type: actions.FETCH_POKEDEX_REQUEST },
      { type: actions.FETCH_POKEDEX_SUCCESS, pokemon: MOCK_POKEDEX_ENTRY }
    ]
    const store = mockStore({ pokedex: {} })

    return store.dispatch(actions.fetchPokedex()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it("should create FETCH_POKEDEX_FAILURE when fetching pokemon data returns a non-200 status code", () => {
    fetchMock
      .getOnce("/pokedex.json", 500)

    const expectedActions = [
      { type: actions.FETCH_POKEDEX_REQUEST },
      { type: actions.FETCH_POKEDEX_FAILURE }
    ]
    const store = mockStore({ pokedex: {} })

    return store.dispatch(actions.fetchPokedex()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it("should create FETCH_POKEDEX_FAILURE when fetching pokemon data returns a non-200 status code", () => {
    fetchMock
      .getOnce("/pokedex.json", {"throws": "network failure"})

    const expectedActions = [
      { type: actions.FETCH_POKEDEX_REQUEST },
      { type: actions.FETCH_POKEDEX_FAILURE, "error": "network failure" }
    ]
    const store = mockStore({ pokedex: {} })

    return store.dispatch(actions.fetchPokedex()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})