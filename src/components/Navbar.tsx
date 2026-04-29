import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = (): JSX.Element => {
  const { user, isAdmin, login, logout } = useAuth()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <span className="navbar-brand fw-bold">🪵 Villakazi Scouts</span>
      <div className="navbar-nav ms-auto d-flex align-items-center gap-2">
        <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
        <NavLink className="nav-link" to="/products">Products</NavLink>
        {isAdmin && <NavLink className="nav-link" to="/add">Add Product</NavLink>}
        {isAdmin && <NavLink className="nav-link" to="/sales">Sales Log</NavLink>}
        {user ? (
          <button className="btn btn-outline-light btn-sm" onClick={logout}>
            Logout
          </button>
        ) : (
          <button className="btn btn-success btn-sm" onClick={login}>
            Admin Login
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar