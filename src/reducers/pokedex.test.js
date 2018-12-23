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

  it("should handle TOGGLE_CAPTURE_STATUS", () => {
    const capturedPokemon = { ...MOCK_POKEDEX_ENTRY.Bulbasaur, captured: true }
    const uncapturedPokemon = { ...MOCK_POKEDEX_ENTRY.Bulbasaur, captured: false }
    expect(capturedPokemon.captured).toEqual(!uncapturedPokemon.captured) // Just making sure that we have our setup correct
    const store = {
      pokemon: {
        Bulbasaur: uncapturedPokemon
      }
    }
    const action = {
      type: actions.TOGGLE_CAPTURE_STATUS,
      pokemon: "Bulbasaur"
    }
    const expected = {
      pokemon: {
        Bulbasaur: capturedPokemon
      }
    }
    expect(pokedex(store, action)).toEqual(expected)
  })
})