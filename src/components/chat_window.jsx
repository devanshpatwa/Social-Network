import React, { Component } from "react";
import firebase from "firebase";
import { Motion, spring, presets } from "react-motion";
import styled from "styled-components";
import Header from "../header_footer/Header_home";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Logo from "../images/logo.jpg";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { Redirect } from "react-router";
import "../config";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../chat.css";
// import Header from "../header_footer/Header";
import Header_home from "../header_footer/Header_home";

//material ui icons
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import PersonIcon from "@material-ui/icons/Person";

var flag = 0;

class Chat_Window extends Component {
  state = {
    username: localStorage.getItem("firstname"),
    username_chatwith: this.props.match.params.username,
    message_send: "",
    message_list: "Chat with " + this.props.match.params.username,
  };

  //to refresh the page
  refreshPage() {
    window.location.reload(true);
  }

  //to insert message in db on send button click
  insertMessage() {
    firebase
      .database()
      .ref("chat")
      .push({
        [localStorage.getItem("firstname") +
        "-" +
        this.state.username_chatwith]: this.state.message_send,
        time: firebase.database.ServerValue.TIMESTAMP,
      });
     
  }

  //      var parent="";
  //   var ref = firebase.database().ref('users');
  //   ref.orderByChild('firstname').equalTo('Delara').on("value", function(snapshot) {
  //     snapshot.forEach((function(child) {
  //       parent=child.key;
  //       console.log(parent);
  // limittoLast(2) function is also there
  //     }) )
  //  });

  //to retrieve the messages
  retrieveMessage() {
    var chat_personal =
      this.state.username + "-" + this.state.username_chatwith;
    var chat_personal_invert =
      this.state.username_chatwith + "-" + this.state.username;
    firebase
      .database()
      .ref("chat")
      .orderByChild("time")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((item) => {
          if (item.val()[chat_personal] != undefined) {
            this.setState({
              message_list:
                this.state.message_list +
                "%^&" +
                this.state.username +
                ":%^! " +
                item.val()[chat_personal],
            });
          }
          if (item.val()[chat_personal_invert] != undefined) {
            this.setState({
              message_list:
                this.state.message_list +
                "%^&" +
                this.state.username_chatwith +
                ": " +
                item.val()[chat_personal_invert],
            });
          }
        });
      });
  }

  retrieveMessageAfter() {
    console.log(this.state.message_list);
    var chat_personal =
      this.state.username + "-" + this.state.username_chatwith;
    var chat_personal_invert =
      this.state.username_chatwith + "-" + this.state.username;
    firebase
      .database()
      .ref("chat")
      .orderByChild("time")
      .limitToLast(1)
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((item) => {
          if (item.val()[chat_personal] != undefined) {
            this.setState({
              message_list:
                this.state.message_list +
                "%^&" +
                this.state.username +
                ":%^! " +
                item.val()[chat_personal],
            });
          }
          if (item.val()[chat_personal_invert] != undefined) {
            this.setState({
              message_list:
                this.state.message_list +
                "%^&" +
                this.state.username_chatwith +
                ": " +
                item.val()[chat_personal_invert],
            });
          }
        });
      });
  }

  Submit = (e) => {
    e.preventDefault();
    this.insertMessage();
    this.retrieveMessageAfter();
  };

  render() {
    if (flag == 0) {
      this.retrieveMessage();
      flag = 1;
    }
    return (
      <React.Fragment>
        <nav class="navbar navbar-expand-md bg-white bg-light">
          <a class="navbar-brand" href="/homepage">
            <img src={Logo} alt="Logo" style={{ height: "90px" }} />
          </a>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto"></ul>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/homepage">
                  <HomeWorkIcon
                    style={{ fontSize: "xx-large", color: "#344955" }}
                  />
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/PersonalInfo">
                  <PersonIcon
                    style={{ fontSize: "xx-large", color: "#344955" }}
                  />
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">
                  <ExitToAppIcon
                    style={{ fontSize: "xx-large", color: "#344955" }}
                  />
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div>
          <div class="container_chat center_div container">
            <form onSubmit={(e) => this.Submit(e)}>
              {/* <h1>{this.state.message_list}</h1> */}

              {this.state.message_list.split("%^&").map((del) =>
                del.includes("%^!") ? (
                  // <div className="message sent">
                  // <div class="chat-panel">
                  <div class="row no-gutters">
                    <div class="col-md-3 offset-md-9">
                      <div className="sent1 message sent1--right ">
                        <p className="p_chat1">{del.replace("%^!", "")}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  //  <div className="message received">

                  <div class="row no-gutters">
                    <div class="col-md-3">
                      <div className="message sent sent--left">
                        <p className="p_chat">{del.replace("%^!", "")}</p>
                      </div>
                    </div>
                  </div>
                )
              )}

              <div className="same-line">
                <div className="chat-box-tray">
                  <input
                    type="text"
                    id="send_text"
                    style={{
                      marginLeft: ".5%",
                      marginTop: "0%",
                      width: "100%",
                    }}
                    className="form-control border-1 shadow-sm px-4 text-primary text"
                    placeholder="Type your message here!!!"
                    onChange={(e) =>
                      this.setState({ message_send: e.target.value })
                    }
                  />
                </div>
                <input
                  type="submit"
                  name="btn_send"
                  className="btn-grad"
                  // onClick={this.insertMessage.bind(this)}
                  onClick={(e) => this.Submit(e)}
                  value="Send"
                />
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Chat_Window;
