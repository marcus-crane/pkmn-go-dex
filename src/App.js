import React, { Component } from "react"
import Nav from "./components/Nav"
import Card from "./components/Card"
import { COMPLETED_BUTTON_TEXT, POKEDEX_LOADING_TEXT, PKMN_EVOLVES_TEXT, PKMN_NO_EVOLVE_TEXT } from "./constants"
import { fetchPokedex } from "./actions/pokedex"
import { connect } from "react-redux"
import propTypes from "prop-types"
import "./App.css"

class App extends Component {
  componentDidMount() {
    this.props.fetchPokedex()
  }

  render() {

    const {
      fetching,
      hovering,
      pokemon
    } = this.props

    return fetching ? <p>{ POKEDEX_LOADING_TEXT[Math.floor(Math.random() * Math.floor(POKEDEX_LOADING_TEXT.length))] }</p> :
      <div>
        <Nav />
        <div className="ui special cards three wide cardholder">
          {Object.values(pokemon).map(entry => {
            return (
              <Card key={entry.number}>
                <div className={`blurring dimmable image ${pokemon[entry.name].captured ? "dimmed": ""}`}>
                  <div className={`ui dimmer ${hovering === entry.name ? "transition visible active dimmer-flex" : ""}`}>
                    <div className="content">
                      <div className="center">
                        <div className="ui inverted button">{ COMPLETED_BUTTON_TEXT }</div>
                      </div>
                    </div>
                  </div>
                  <img src={entry.image} alt={entry.name} />
                </div>
                <div className="content">
                  <div className="header">{entry.name}</div>
                  <div className="meta">
                    {entry.type}
                  </div>
                </div>
                <div className="extra content">
                  <span className="right floated">
                    <label>Candy: </label>
                    <input width="3" type="number"></input>
                  </span>
                  <span>
                    {entry.evolves ? PKMN_EVOLVES_TEXT(entry.evolves) : PKMN_NO_EVOLVE_TEXT }
                  </span>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
  }
}

// onMouseEnter={() => this.setState({ hovering: entry.name })} onMouseLeave={() => this.setState({ hovering: "" })}

const mapStoreToProps = store => {
  return {
    fetching: store.pokedex.fetching,
    hovering: store.pokedex.hovering,
    ref: store.pokedex.ref,
    pokemon: store.pokedex.pokemon
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPokedex: () => dispatch(fetchPokedex())
  }
}

App.propTypes = {
  fetching: propTypes.bool,
  fetchPokedex: propTypes.func,
  hovering: propTypes.bool,
  ref: propTypes.string,
  pokemon: propTypes.object
}

export default connect(mapStoreToProps, mapDispatchToProps)(App)
