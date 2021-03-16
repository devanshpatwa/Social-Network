import React, { Component } from "react";
import firebase from "firebase";
import "../components/chat_list.css";
import "bootstrap/dist/css/bootstrap.css";
import { Redirect } from "react-router";
import "../config";
import Header_home from "../header_footer/Header_home";
import * as GrGroup from "react-icons/gr";

import { Link } from "react-router-dom";
// import {Sidebar} from  "../sidebar/sidebar";
import "../sidebar/home_menu.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Posts from "./posts";
import Chat_List from "./chat_list";
import { Sidebar } from "../sidebar/sidebar";

toast.configure();
class HomePage extends Component {
  state = {};

  // for Error Notifications
  Notify = () => {
    toast.error("Invalid Username or Password");
  };

  //remove the method
  componentDidMount() {
    firebase
      .database()
      .ref("users")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((item) => {
          if (item.val().email != localStorage.getItem("email")) {
            this.setState({
              username_list:
                this.state.username_list + "," + item.val().username,
            });
          }
        });
      });
  }

  render() {
    if (localStorage.getItem("flag_login") === "0") {
     
      this.Notify();
      return <Redirect to="/" />;
    } else if (localStorage.getItem("flag_login") === "1") {
      return (
        <React.Fragment>
          <Header_home />
          <div class="container-homepage">
            <div class="row">
              <div class="col-2" style={{ backgroundColor: "#344955"}}>
                <div className="container">
                  <div className="row">
                    <div className="col-6" style={{ marginTop: 16,float:"right", fontSize:"1.5em", color:"white" }}>
                      {localStorage.getItem("firstname")}
                    </div>
                    <div className="col-3">
                      <img
                        className="rounded-circle mx-auto d-block"
                        width="35px"
                        height="35px"
                        src={
                          localStorage.getItem("user_img") ||
                          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200&r=pg&d=404"
                        }
                        style={{ marginTop: 16 }}
                      />
                    </div>
                    <div className="col-3">
                      <div class="navbar-nav ml-auto">
                        <Link to="/Update" className="nav-item nav-link">
                          <svg
                            width="1.5em"
                            height="3em"
                            viewBox="0 0 16 16"
                            class="bi bi-gear"
                            fill="white"
                            
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
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
              </div>
              <div class="col-7">
                <Posts />
              </div>
              <div class="col-3" style={{backgroundColor:"#344955"}}>
                <Chat_List />
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default HomePage;
