import React from "react";
import { Link, useLocation } from "wouter";

function Header(props) {
  const [location] = useLocation();
  return (
    <header className="container-fluid">
      <nav>
        <ul>
          <li>
            <strong>Dashboard</strong>
          </li>
        </ul>
        <ul>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
