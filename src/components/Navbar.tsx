import { useState, useEffect } from "react";
import "./navbar.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="logo">COGNIFLIX</div>
      <ul className="navbar-links">
        <li>Home</li>
        <li>Movies</li>
        <li>TV Shows</li>
        <li>New & Popular</li>
        <li>My List</li>
      </ul>
    </header>
  );
}