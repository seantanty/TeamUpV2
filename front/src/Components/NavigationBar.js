import React from "react";
import { Link, useLocation } from "react-router-dom";

import "../styles/navigationbar.css";
import icon from "../styles/logo60.png";

const NavigationBar = () => {
  const location = useLocation();
  console.log("Render NavigationBar", location);

  return (
    <nav className="navbar navbar-expand-lg color-nav">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img id="icon" src={icon} alt="icon" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={
                  "nav-link" + (location.pathname === "/" ? " active" : "")
                }
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  "nav-link" +
                  (location.pathname === "/createPost" ? " active" : "")
                }
                to="/createPost"
              >
                Write a post
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  "nav-link" +
                  (location.pathname === "/dashboard" ? " active" : "")
                }
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
