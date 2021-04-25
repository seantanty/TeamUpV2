import React from "react";
import NavigationBar from "./NavigationBar.js";
import SignInOut from "./SignInOut.js";

import "../styles/header.css";

const Header = () => {
  return (
    <div className="headerBody">
      <NavigationBar className="navbar"></NavigationBar>
      <SignInOut className="signinout"></SignInOut>
    </div>
  );
};

export default Header;
