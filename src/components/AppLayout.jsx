import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiSearch,
  FiUsers,
  FiPlusCircle,
  FiShield,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";
import { getInitials } from "../utils.js";

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigationLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <FiGrid /> },
    { to: "/groups", label: "Browse Groups", icon: <FiSearch /> },
    { to: "/my-groups", label: "My Groups", icon: <FiUsers /> },
    { to: "/groups/new", label: "Create Group", icon: <FiPlusCircle /> },
  ];
  if (user.role === "admin")
    navigationLinks.push({
      to: "/admin",
      label: "Admin Panel",
      icon: <FiShield />,
    });

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="brand">
          <span className="brand-mark">SG</span> StudyGroup
        </div>
        <nav>
          {navigationLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              onClick={() => setMenuOpen(false)}
            >
              {link.icon} {link.label}
            </NavLink>
          ))}
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut /> Log out
        </button>
      </aside>
      {menuOpen && (
        <div className="backdrop" onClick={() => setMenuOpen(false)} />
      )}

      <div className="main-area">
        <header className="topbar">
          <button
            className="icon-btn menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
          <div className="topbar-user">
            <div className="topbar-text">
              <strong>{user.name}</strong>
              <small>
                {user.role === "admin" ? "Administrator" : user.program}
              </small>
            </div>
            <div className="avatar">{getInitials(user.name)}</div>
          </div>
        </header>
        <main className="page">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
