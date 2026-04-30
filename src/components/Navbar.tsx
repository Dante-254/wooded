import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAdmin, login, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg px-4 py-3" style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #2e2e2e' }}>
  <span className="navbar-brand fw-500 text-white" style={{ letterSpacing: '0.5px', fontSize: '1rem' }}>
    🪵 Villakazi Scouts
  </span>
  <div className="navbar-nav ms-auto d-flex align-items-center gap-3">
    <NavLink
      className={({ isActive }) =>
        `text-decoration-none fw-400 ${isActive ? 'text-white' : 'text-secondary'}`
      }
      to="/dashboard"
    >
      Dashboard
    </NavLink>
    <NavLink
      className={({ isActive }) =>
        `text-decoration-none fw-400 ${isActive ? 'text-white' : 'text-secondary'}`
      }
      to="/products"
    >
      Products
    </NavLink>
    {isAdmin && (
      <NavLink
        className={({ isActive }) =>
          `text-decoration-none fw-400 ${isActive ? 'text-white' : 'text-secondary'}`
        }
        to="/add"
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
      >
        Sales Log
      </NavLink>
    )}
    {user ? (
      <button
        className="btn btn-sm"
        style={{ backgroundColor: '#2e2e2e', color: '#ccc', border: '1px solid #3e3e3e' }}
        onClick={logout}
      >
        Logout
      </button>
    ) : (
      <button
        className="btn btn-sm"
        style={{ backgroundColor: '#2e2e2e', color: '#ccc', border: '1px solid #3e3e3e' }}
        onClick={login}
      >
        Admin Login
      </button>
    )}
  </div>
</nav>
  );
};

export default Navbar;
