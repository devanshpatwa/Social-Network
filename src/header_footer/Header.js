
import React, { Component, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../components/style.css";
import * as GrGroup from "react-icons/gr";
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />;
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />;
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />;
class Header extends React.Component
{
  render()
  {
    return (
      <div className="main-content">
     
      {/* <nav className="navbar navbar-expand bg-custom-2 nav-font" style={{backgroundColor:"#DADED4" }}>
      <ul className="navbar-nav">
        <li className="nav-item active" >
          <a className="nav-link" href="#" style={{color:"white"}}>Home</a>
        </li>
        <li className="nav-item active">
          <a className="nav-link" href="#" style={{color:"#white"}}>NewsFeed</a>
        </li>
        <li className="nav-item active">
          <a className="nav-link" href="/" style={{color:"#white"}}>Profile</a>
        </li>
        <li className="nav-item active">
          <a className="nav-link" href="#" style={{color:"#white"}}>Notification</a>
        </li>
      </ul> */}
<nav class="navbar navbar-expand-md bg-custom-2 nav-font navbar-dark">

<a href="#" class="navbar-brand">
        <img src="images/logo.svg" height="28" alt="CoolBrand"/>
    </a>
    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
        <span class="navbar-toggler-icon"></span>
    </button>

      <div class="collapse navbar-collapse" id="navbarCollapse">
      <div class="navbar-nav">

         <a href="#" class="nav-item nav-link active">Home</a>
            <a href="#" class="nav-item nav-link">Profile</a>
            <a href="#" class="nav-item nav-link">Messages</a>
            <a href="#" class="nav-item nav-link" tabindex="-1">Reports</a>
      </div>
      <div class="navbar-nav ml-auto">
            <a href="/Update" className="nav-item nav-link"><GrGroup.GrUserSettings/></a>
        </div>
      
      {/* <a href="/Update" className="btn btn-outline-dark fas fa-cog fa-spin" style={{marginLeft:900}}>
                    Setting
                  </a> */}
    
      </div>
      </nav>
      </div>
     
    )
  }
}
export default Header;