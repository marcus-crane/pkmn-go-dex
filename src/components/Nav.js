import React from 'react'
import { APP_TITLE, NAV_ITEMS } from '../constants'

const Nav = () => {
  return (
    <div className="ui fixed inverted menu">
      <div className="ui container">
        <a href="#" className="header item">
          { APP_TITLE }
        </a>
        { NAV_ITEMS.map(item => <a href={item.href} className="item">{item.name}</a> )}
      </div>
    </div>
  )
}

export default Nav