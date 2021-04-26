import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SignInOut = () => {
  const [link, setLink] = useState("/login");
  const [buttonValue, setButtonValue] = useState("SIGN IN/UP");

  useEffect(() => {
    //get user info from local storage
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    console.log("Got user", loggedInUser);

    if (loggedInUser) {
      setLink("/logout");
      setButtonValue("SIGN OUT");
    } else {
      setLink("/login");
      setButtonValue("SIGN IN/UP");
    }
  }, [buttonValue]);

  const logInOut = async (event) => {
    event.preventDefault();
    if (buttonValue === "SIGN OUT") {
      console.log("get logout request");
      await fetch("/logout");
      localStorage.removeItem("user");
      window.location.href = "/";
    } else {
      window.location.href = "/login";
    }
  };

  const buttonStyle = {
    background: "none",
    border: 0,
    color: "white",
  };

  return (
    <div className="SignInOut">
      <Link to={link}>
        <button
          type="button"
          className="btn btn-light"
          style={buttonStyle}
          onClick={logInOut}
        >
          {buttonValue}
        </button>
      </Link>
    </div>
  );
};

export default SignInOut;
