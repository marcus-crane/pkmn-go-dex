import React, { Component } from "react"
import Nav from "./components/Nav"
import Card from "./components/Card"
import { COMPLETED_BUTTON_TEXT, PKMN_EVOLVES_TEXT, PKMN_NO_EVOLVE_TEXT } from "./constants"
import "./App.css"

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hovering: false,
      ref: "",
      
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="ui main text container">
          <h1 className="ui header">Hello</h1>
        </div>
        <div className="ui special cards three wide" style={{marginTop: `${30}px`, marginLeft: `${15}px`, marginRight: `${15}px`}}>
          {Object.values(this.state.pokemon).map(entry => {
            return (
              <Card key={entry.name}>
                <div className={`blurring dimmable image ${this.state.pokemon[entry.name].captured ? "dimmed": ""}`} onMouseEnter={() => this.setState({ hovering: entry.name })} onMouseLeave={() => this.setState({ hovering: "" })}>
                  <div className={`ui dimmer ${this.state.hovering === entry.name ? "transition visible active dimmer-flex" : ""}`}>
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
    )
  }
}

export default App
