import { useState } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "../styles/navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav className="navbar">
        {/* Sección usuario */}
        <div className="navbar-section--user">
          <FaUserCircle size={28} className="icon-user" />
        </div>

        {/* Logo */}
        <div className="navbar-section--logo">
          <img src="/otter-logo.png" alt="Otter Logo" />
        </div>

        {/* Menú */}
        <div className="navbar-section--menu">
          <FaBars
            size={26}
            className="icon-menu"
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </nav>

      {/* Menú flotante */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <FaTimes
          size={26}
          className="icon-close"
          onClick={() => setMenuOpen(false)}
        />
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </div>
    </header>
  );
}
