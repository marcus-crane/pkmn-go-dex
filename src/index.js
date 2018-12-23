import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import { createLogger } from "redux-logger"
import thunkMiddleware from "redux-thunk"
import rootReducer from "./reducers"
import App from "./App"

const ROOT_EL = document.getElementById("root")

const loggerMiddleware = createLogger()

const initialState = {
  pokedex: {
    fetching: true,
    hovering: false,
    ref: ""
  }
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(
      thunkMiddleware,
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
