import React from "react";
import styles from "./Footer.module.css";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";  // Social Media Icons
import logo from './img/logo.png';

function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Logo and Website Name */}
      <div className={styles.logoSection}>
        <img
          src={logo}
          alt="Cricket League Logo"
          className={styles.logo}
        />
        <h2 className={styles.title}>KT20</h2>
      </div>

      {/* Links Section */}
      <div className={styles.links}>
        <a href="#home">Home</a>
        <a href="#livescore">Live Scores</a>
        <a href="#playerlist">Players</a>
        <a href="#gallery">Gallery</a>
        <a href="#upcoming">Upcoming Matches</a>
        <a href="#contact">Contact</a>
      </div>

      {/* Social Media Icons */}
      <div className={styles.socialMedia}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className={styles.icon} />
        </a>
        <a href="https://www.instagram.com/kt20canada/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className={styles.icon} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className={styles.icon} />
        </a>
        <a href="https://www.youtube.com/@kt20canada20" target="_blank" rel="noopener noreferrer">
          <FaYoutube className={styles.icon} />
        </a>
      </div>

      {/* Copyright Text */}
      <div className={styles.copyright}>
        <p>© {new Date().getFullYear()} Cricket Premier League. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;