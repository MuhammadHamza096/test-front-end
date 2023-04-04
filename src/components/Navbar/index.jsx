import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// Css
// import css from "../style/navbar.module.scss";
// import "../style/global.scss";
import "./style.css";
// Icons
import NotificationsIcon from "@mui/icons-material/Notifications";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const Navbar = ({ toggle, settoggle }) => {
  const [stickyNavbar, setStickyNavbar] = useState(false);
  const ChangeNav = () => {
    if (window.scrollY > 200) {
      setStickyNavbar(true);
    } else {
      setStickyNavbar(false);
    }
  };
  window.addEventListener("scroll", ChangeNav);

  const Toggle = () => {
    settoggle(!toggle);
  };

  return (
    <div
      className={`navbar
    ${toggle ? "navbar-active" : ""} 
  `}
    >
      <div className="navbar-wrapper">
        <div className="navbar-left">
          <div>
            <div
              className={`hamburger-menu ${toggle ? "hamburger-active" : ""} `}
              onClick={Toggle}
            >
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>

          <h3>Muhammad Hamza</h3>
        </div>
        <div className="navbar-right">
          <div className="navbar-right-items">
            <NotificationsIcon className="icon" />
            <div className="counter">1</div>
          </div>

          <div className="navbar-right-items">
            <TextsmsRoundedIcon className="icon" />
            <div className="counter">20</div>
          </div>

          <div className="navbar-right-items last-element">
            <h5>HA</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
