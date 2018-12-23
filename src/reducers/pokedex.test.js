import pokedex from "./pokedex"
import * as actions from "../actions/pokedex"
import { MOCK_POKEDEX_ENTRY } from "../constants"

describe("pokedex reducer", () => {
  it("should return the initial state", () => {
    const store = undefined
    const action = "UNDEFINED"
    const expected = {}
    expect(pokedex(store, action)).toEqual(expected)
  })

  it("should handle FETCH_POKEDEX_REQUEST", () => {
    const store = {}
    const action = { type: actions.FETCH_POKEDEX_REQUEST }
    const expected = { fetching: true }
    expect(pokedex(store, action)).toEqual(expected)
  })

  it("should handle FETCH_POKEDEX_SUCCESS", () => {
    const store = {}
    const action = {
      type: actions.FETCH_POKEDEX_SUCCESS,
      pokemon: MOCK_POKEDEX_ENTRY
    }
    const expected = {
      fetching: false,
      pokemon: MOCK_POKEDEX_ENTRY
    }
    expect(pokedex(store, action)).toEqual(expected)
  })

  it("should handle FETCH_POKEDEX_FAILURE", () => {
    const store = {}
    const action = {
      type: actions.FETCH_POKEDEX_FAILURE,
      errorMessage: "500 Internal Server Error"
    }
    const expected = {
      fetching: false,
      errorMessage: "500 Internal Server Error"
    }
    expect(pokedex(store, action)).toEqual(expected)
  })
})