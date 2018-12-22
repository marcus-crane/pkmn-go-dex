import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import { createLogger } from "redux-logger"
import rootReducer from "./reducers"
import { PKMN_IMG_BASE } from "./constants"
import App from "./App"

const ROOT_EL = document.getElementById("root")

const loggerMiddleware = createLogger()

const initialState = {
  hovering: false,
  ref: "",
  pokemon: {
    Bulbasaur: {
      captured: false,
      evolves: 25,
      name: "Bulbasaur",
      number: "001",
      image: `${PKMN_IMG_BASE}/001.png`,
      type: "Grass / Poison"
    },
    Ivysaur: {
      captured: false,
      evolves: 100,
      name: "Ivysaur",
      number: "002",
      image: `${PKMN_IMG_BASE}/002.png`,
      type: "Grass / Poison"
    },
    Venusaur: {
      captured: false,
      evolves: false,
      name: "Venusaur",
      number: "003",
      image: `${PKMN_IMG_BASE}/003.png`,
      type: "Grass / Poison"
    },
    Charmander: {
      captured: false,
      evolves: 25,
      name: "Charmander",
      image: `${PKMN_IMG_BASE}/004.png`,
      type: "Fire"
    },
    Charmeleon: {
      captured: false,
      evolves: 100,
      name: "Charmeleon",
      image: `${PKMN_IMG_BASE}/005.png`,
      type: "Fire"
    },
    Charizard: {
      captured: false,
      evolves: false,
      name: "Charizard",
      image: `${PKMN_IMG_BASE}/006.png`,
      type: "Fire / Flying"
    },
    Groudon: {
      captured: false,
      evolves: false,
      name: "Groudon",
      image: `${PKMN_IMG_BASE}/383.png`,
      type: "Ground"
    }
  }
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(
      loggerMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  ROOT_EL
)
