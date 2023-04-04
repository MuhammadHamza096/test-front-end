import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/SideBar";
import "./style.css";
const Layout = ({ Component }) => {
  const [toggle, settoggle] = useState(false);
  return (
    <div className="main-container">
      <Navbar toggle={toggle} settoggle={settoggle} />
      <Sidebar toggle={toggle} settoggle={settoggle} />
      <div className={`main ${toggle ? "mainActive" : ""}`}>
        <Component />
      </div>
    </div>
  );
};
export default Layout;
