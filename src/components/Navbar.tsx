import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Plus } from 'lucide-react'

const Navbar = () => {
  const { user, isAdmin, login, logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <nav
      className="navbar navbar-expand-lg px-4 py-3"
      style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #2e2e2e' }}
    >
      <div className="d-flex align-items-center gap-2 navbar-brand mb-0">
  <img
    src="/favicon-32x32.png"
    alt="Villakazi Creatives logo"
    style={{ width: '28px', height: '28px', borderRadius: '6px' }}
  />
  <span
    className="fw-600 text-white"
    style={{ letterSpacing: '0.3px', fontSize: '0.95rem' }}
  >
    Villakazi Creatives
  </span>
</div>

      {/* Hamburger button — only visible on mobile */}
      <button
        className="navbar-toggler border-0"
        style={{ color: '#ccc' }}
        onClick={() => setOpen(!open)}
      >
        <span style={{ fontSize: '1.4rem' }}>{open ? '✕' : '☰'}</span>
      </button>

      {/* Links — collapse on mobile, show on desktop */}
      <div className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
        <div className="navbar-nav ms-auto d-flex align-items-lg-center gap-3 mt-3 mt-lg-0">
          <NavLink
            className={({ isActive }) =>
              `text-decoration-none fw-400 ${isActive ? 'text-white' : 'text-secondary'}`
            }
            to="/dashboard"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `text-decoration-none fw-400 ${isActive ? 'text-white' : 'text-secondary'}`
            }
            to="/products"
            onClick={() => setOpen(false)}
          >
            Products
          </NavLink>

          {isAdmin && (
            <NavLink
              className={({ isActive }) =>
                `text-decoration-none fw-400 ${isActive ? 'text-white' : 'text-secondary'}`
              }
              to="/add"
              onClick={() => setOpen(false)}
            >
              Add Product
            </NavLink>
          )}

          {isAdmin && (
            <NavLink
              className={({ isActive }) =>
                `text-decoration-none fw-400 ${isActive ? 'text-white' : 'text-secondary'}`
              }
              to="/sales"
              onClick={() => setOpen(false)}
            >
              Sales Log
            </NavLink>
          )}

          {user ? (
            <button
              className="btn btn-sm"
              style={{ backgroundColor: '#2e2e2e', color: '#ccc', border: '1px solid #3e3e3e' }}
              onClick={() => { logout(); setOpen(false) }}
            >
              Logout
            </button>
          ) : (
            <button
              className="btn btn-sm"
              style={{ backgroundColor: '#2e2e2e', color: '#ccc', border: '1px solid #3e3e3e' }}
              onClick={() => { login(); setOpen(false) }}
            >
              <Plus size={16} color="#ccc" />
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar