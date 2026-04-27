import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar bg-light">
      <span className="navbar-brand fw-bold">🪵 Villakazi Scouts</span>
      <div className="navbar-nav d-flex justify-content-space-between gap-3 flex-row">
        <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
        <NavLink className="nav-link" to="/products">Products</NavLink>
        <NavLink className="nav-link" to="/add">Add Product</NavLink>
        <NavLink className="nav-link" to="/sales">Sales Log</NavLink>
      </div>
    </nav>
  )
}

export default Navbar