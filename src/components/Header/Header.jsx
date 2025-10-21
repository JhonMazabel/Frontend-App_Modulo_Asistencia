import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import UserMenu from "./UserMenu";

const Header = ({ username = "Invitado" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click or Escape
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    function handleKey(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__logo">🎓 Portal Académico</div>

        <div
          className={`header__user ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          ref={menuRef}
          role="button"
          tabIndex={0}
          aria-haspopup="true"
          aria-expanded={menuOpen}
        >
          <span className="header__username">{username}</span>
          <img
            className="header__avatar"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Usuario"
          />

          {menuOpen && <UserMenu />}
        </div>
      </div>
    </header>
  );
};

export default Header;
