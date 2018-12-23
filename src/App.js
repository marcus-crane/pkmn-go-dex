import React, { PureComponent } from "react"
import Nav from "./components/Nav"
import Card from "./components/Card"
import { COMPLETED_BUTTON_TEXT, POKEDEX_LOADING_TEXT, PKMN_EVOLVES_TEXT, PKMN_NO_EVOLVE_TEXT } from "./constants"
import { fetchPokedex, toggleCaptureStatus, toggleHovering } from "./actions/pokedex"
import { connect } from "react-redux"
import propTypes from "prop-types"
import "./App.css"
import { generateBackground } from "./utils"

class App extends PureComponent {
  componentDidMount() {
    this.props.fetchPokedex()
  }

  render() {

    return this.props.fetching ? <p>{ POKEDEX_LOADING_TEXT[Math.floor(Math.random() * Math.floor(POKEDEX_LOADING_TEXT.length))] }</p> :
      <div>
        <Nav />
        <div className="ui special cards three wide cardholder">
          {Object.values(this.props.pokemon).map(entry => {
            return (
              <Card key={entry.number}>
                <div style={!entry.caught ? {background: generateBackground(entry.type) } : {background: 'grey' }} className={`blurring dimmable image ${entry.captured ? "dimmed" : ""}`} onMouseEnter={() => this.props.toggleHovering(entry.name) }>
                  <div className={`ui dimmer ${this.props.ref === entry.name ? "transition visible active dimmer-flex" : ""}`}>
                    <div className="content">
                      <div className="center">
                        <div className="ui inverted button" onClick={() => this.props.toggleCaptureStatus(entry.name) }>{ COMPLETED_BUTTON_TEXT }</div>
                      </div>
                    </div>
                  </div>
                  <img src={entry.image} alt={entry.name} />
                </div>
                <div className="content">
                  <div className="header" onClick={() => this.props.toggleCaptureStatus(entry.name) }>{entry.name}</div>
                  <div className="meta">
                    #{entry.number} {this.props.pokemon[entry.name].caught ? "[ CAUGHT ]" : ""}
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
    fetchPokedex: () => dispatch(fetchPokedex()),
    toggleCaptureStatus: (pokemon) => dispatch(toggleCaptureStatus(pokemon)),
    toggleHovering: (pokemon) => dispatch(toggleHovering(pokemon))
  }
}

App.propTypes = {
  fetching: propTypes.bool,
  fetchPokedex: propTypes.func,
  hovering: propTypes.bool,
  ref: propTypes.string,
  pokemon: propTypes.object,
  toggleCaptureStatus: propTypes.func,
  toggleHovering: propTypes.func
}

export default connect(mapStoreToProps, mapDispatchToProps)(App)
