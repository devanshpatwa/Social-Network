import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../components/style.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { Sidebar } from "../sidebar/sidebar";
import { IconContext } from "react-icons";
import * as GrGroup from "react-icons/gr";
import Logo from "../images/logo.jpg";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import HomeWorkIcon from "@material-ui/icons/HomeWork";
import PersonIcon from "@material-ui/icons/Person";

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />;
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />;
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>;

function Header_home() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  console.log(localStorage.getItem("user_img"));
  return (
    <div className="main-content">
      <nav class="navbar navbar-expand-md bg-white bg-light">
        <a class="navbar-brand" href="/homepage">
          <img src={Logo} alt="Logo" style={{ height: "90px" }} />
        </a>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto"></ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="/homepage">
                <HomeWorkIcon style={{ fontSize: "xx-large",color:"#344955" }} />
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/PersonalInfo">
                <PersonIcon style={{ fontSize: "xx-large",color:"#344955" }} />
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/">
                <ExitToAppIcon style={{ fontSize: "xx-large",color:"#344955" }} />
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* <div style={{height:"80px"}}>
     <img src={Logo}  style={{height:"500px",marginTop:"-12%",marginBottom:"0%",marginLeft:"-18%"}}/>
     </div> */}
      <nav
        className="navbar navbar-expand navbar-dark bg-custom-2"
        style={{ height: "5px" }}
      >
       
      </nav>
      {/* //main menu */}
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {Sidebar.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Header_home;
