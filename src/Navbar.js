import React from 'react'
import { NavLink } from "react-router-dom";


function Navbar() {
  return (
    <nav className="nav">
      <ul>
        <li className="active"><NavLink to="/">Home</NavLink></li>
        <li className="active"><NavLink to="/trading">Trading</NavLink></li>
        <li className="active"><NavLink to="/watchlist">Watchlist</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar