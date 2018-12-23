import React from "react"
import propTypes from "prop-types"

const Card = ({ children }) => {
  return (
    <div className="card">
      {children}
    </div>
  )
}

Card.propTypes = {
  children: propTypes.array,
}

export default Card