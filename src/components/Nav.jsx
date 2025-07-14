import React, { useState } from "react";
import { Link } from "react-scroll";
import { Home, Trophy, Images, List, Users, PieChart, Menu } from "lucide-react";
import Login from "./Login.jsx";
import styles from "./Nav.module.css";
import logo from './logo.png';

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openLogin = () => {
    setShowLogin(true);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  const menuItems = [
    { icon: Home, text: "Home", sectionId: "home" },
    { icon: Trophy, text: "Matches", sectionId: "live-section" },
    { icon: Images, text: "Gallery", sectionId: "gallery" },
    { icon: List, text: "Point Table", sectionId: "playerlist" },
    { icon: Users, text: "Teams", sectionId: "teams" },
  ];

  return (
    <>
      <nav className={styles.container}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>

        {/* Navigation Menu */}
        <ul className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          {menuItems.map((item, index) => (
            <li key={index} className={styles.nav_item}>
              <Link
                to={item.sectionId}
                smooth={true}
                duration={100}
                offset={-50} // Adjust offset for fixed navbar
                className={styles.nav_link}
                onClick={() => setMenuOpen(false)}
              >
                <item.icon className={styles.nav_icon} />
                <span className={styles.nav_text}>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section (Admin Login + Menu Toggle) */}
        <div className={styles.rightSection}>
          

          <button className={styles.menuButton} onClick={toggleMenu}>
            <Menu size={30} />
          </button>
        </div>
      </nav>

      {showLogin && <Login onClose={closeLogin} />}
    </>
  );
}

export default Nav;