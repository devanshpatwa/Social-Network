import React, { Component } from "react";
import firebase from "firebase";
import "../components/chat_list.css";
import "bootstrap/dist/css/bootstrap.css";
import "../components/style.css";
import gsap from "gsap";
import TextsmsIcon from '@material-ui/icons/Textsms';
// import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";
// gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin);
import { TimelineMax } from "gsap";

import { Redirect } from "react-router";
import "../config";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chat_Window from "./chat_window";
//   import 'cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js';

toast.configure();
class Chat_List extends Component {
  state = {
    username_list: "Chat Bot",
    image_url: "",
  };

  // for Error Notifications
  Notify = () => {
    toast.error("Invalid Username or Password");
  };

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
                this.state.username_list + "," + item.val().firstname,
            });
          }
        });
      });

    firebase
      .database()
      .ref("images")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((item) => {
          if (item.val().email != localStorage.getItem("email")) {
            console.log("inside image loop"+this.state.image_url);
            this.setState({
              image_url: this.state.image_url + "," + item.val().img,
            });
          }
        });
      });
      console.log("image photo-"+this.state.image_url);
  }

  useEffectt1() {
    const tl = new TimelineMax();
    tl.fromTo("#rocket", 2, { x: 0 }, { x: 20 });
    tl.to("#letters path", 3, {
      strokeDashoffset: 0,
    });
    tl.to("#letters path", 3, { "fill-opacity": 1 });
  }

  render() {
    var f = 1;
    this.useEffectt1();
    if (localStorage.getItem("flag_login") === "0") {
      this.Notify();
      return <Redirect to="/" />;
    } else if (localStorage.getItem("flag_login") === "1") {
      return (
        <React.Fragment>
          <div class="inbox_people">
            <div class="headind_srch">
              <div class="recent_heading">
                <h4>Chat</h4>
              </div>
              
            </div>

            <div class="inbox_chat" style={{height: "104vh"}}>
              {this.state.username_list.split(",").map((del) => (
                <div class="chat_list active_chat">
                  <div class="chat_people">
                    <div className="container">
                      <div className="row">
                        <div className="col-2">
                          {this.state.image_url.split(",").map((i) => (
                            <div class="chat_img">
                              <img
                                className="rounded-circle mx-auto d-block"
                                width="35px"
                                height="35px"
                                src={"image/chat.png" || "image/dummy.jpg"}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="col-10">
                          <div class="chat_ib">
                            <div key={del}>
                              <a style={{color:"white",fontSize:"18px"}} href={"/chat/" + del}>{del}</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* col ends   */}
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Chat_List;
