import React from "react";
import "./style.css";

// React Links
import { NavLink } from "react-router-dom";
// Images
// import TaskLogo from "../assets/images/tasklogo.png";
import TaskLogo from "../../assets/tasklogo.png"

// Icons
import CloseIcon from "@mui/icons-material/Close";

import PersonIcon from '@mui/icons-material/Person';
import GamesIcon from '@mui/icons-material/Games';
import DashboardIcon from '@mui/icons-material/Dashboard';


const Sidebar = ({ toggle, settoggle }) => {
  const Routes = [
    {
      link: "/",
      label: "Dashboard",
      Icon: <DashboardIcon />,
    },
    {
      link: "/users",
      label: "Users",
      Icon: <PersonIcon />,
    },
    {
      link: "/games",
      label: "Games",
      Icon: <GamesIcon />,
    },
    
  ];
  const handleSidebarChange = () => {
    if (window.innerWidth <= 900) {
      settoggle(false);
    }
  };

  return (
    <>
      <div className={`sidebar ${toggle ? "sidebar-active" : ""} `}>
        <div className="sidebar-wrapper">
          <div className="sidebar-top">
            <div className="close-logo">
              <CloseIcon onClick={() => settoggle(false)} />
            </div>
            <div className="sidebar-Logo">
              <img src={TaskLogo} alt="" />
            </div>
            <span>Yolo Group</span>
          </div>
          <div className="sidebar-bottom" >
            {Routes.map((items, i) => {
              return (
                <>
                  <ul className="sidebar-menu">
                    <NavLink
                      key={i}
                      to={items.link}
                      onClick={handleSidebarChange}
                    >
                      <li>
                        <span className="sidebar-icon">{items.Icon}</span>
                        <span className="sidebar-text">{items.label}</span>
                      </li>
                    </NavLink>
                  </ul>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
