import React from "react"
import propTypes from "prop-types"

const Card = (props) => {
  return (
    <div className="card" key={props.key}>
      {props.children}
    </div>
  )
}

Card.propTypes = {
  children: propTypes.element,
  key: propTypes.string,
}

export default Card