import React, { Component } from "react";
import "../events.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import firebase from "firebase";
import "../config";

import { Sidebar } from "../sidebar/sidebar";
import "../sidebar/home_menu.css";
import Header_home from "../header_footer/Header_home";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Event_Modal from "./event_modal";

var left = "";
var parent = "";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Dev",
      modalShow: false,
      seats: 0,
    };
  }

  //modal pop up
  modalOpenValentine() {
    this.setState({ modalShow: true });
    localStorage.setItem("eventName", "valentine");
    this.spotReserved();
  }

  modalOpenHalo() {
    this.setState({ modalShow: true });
    localStorage.setItem("eventName", "halloween");
    this.spotReserved();
  }

  modalOpenGeek() {
    this.setState({ modalShow: true });
    localStorage.setItem("eventName", "geek");
    this.spotReserved();
  }

  //code to update the events database after booking is done
  spotReserved() {
    firebase
      .database()
      .ref("events")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((item) => {
          if (item.val().evename === localStorage.getItem("eventName")) {
            left = item.val().spots;

            //   localStorage.setItem("spt",left);
            this.setState({ seats: left });
            var ref = firebase.database().ref("events");
            ref
              .orderByChild("evename")
              .equalTo(localStorage.getItem("eventName"))
              .on("value", function (snapshot1) {
                snapshot1.forEach(function (child) {
                  parent = child.key;
                  localStorage.setItem("parent", parent);

                  //   Got the parent key from above code now update the values
                  firebase
                    .database()
                    .ref("events/" + parent)
                    .set({
                      evename: localStorage.getItem("eventName"),
                      spots: left - 1,
                      username: "Dev",
                    });
                  return true;
                });
              });
          }
        });
      });
  }

  modalClose() {
    this.setState({ modalShow: false });
    window.location.reload(true);
  }

  render() {
    return (
      <React.Fragment>
        <Header_home />
        <div class="container-homepage">
          <div class="row">
            <div
              class="col-2"
              style={{ backgroundColor: "#344955", height: "100vh" }}
            >
              <div className="container">
                <div className="row">
                  <div
                    className="col-6"
                    style={{
                      marginTop: 16,
                      float: "right",
                      fontSize: "1.5em",
                      color: "white",
                    }}
                  >
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
            <div class="col-10 temp">
              <div class="container mt-5">
                <div class="row">
                  <div class="col-4">
                    <Card className="root-events">
                      <CardActionArea>
                        <CardMedia
                          className="media-events"
                          image="/image/valentine.jpg"
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          <Typography style={{textAlign:"center"}}
                           gutterBottom variant="h5" component="h2">
                            Valentine
                          </Typography>
                          <Typography 
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                      
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button 
                          size="small"
                          color="primary"
                          onClick={(e) => this.modalOpenValentine()}
                        >
                          Reserve Your Spot
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                  <div class="col-4">
                    <Card className="root-events">
                      <CardActionArea>
                        <CardMedia
                          className="media-events"
                          image="/image/halloween.png"
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          <Typography style={{textAlign:"center"}}
                          gutterBottom variant="h5" component="h2">
                            Halloween
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                        
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          onClick={(e) => this.modalOpenHalo()}
                        >
                          Reserve Your Spot
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                  <div class="col-4">
                    <Card className="root-events">
                      <CardActionArea>
                        <CardMedia
                          className="media-events"
                          image="/image/geek-pride-day.jpg"
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          <Typography style={{textAlign:"center"}}
                           gutterBottom variant="h5" component="h2">
                           Geek Pride Day
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                          
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          onClick={(e) => this.modalOpenGeek()}
                        >
                          Reserve Your Spot
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                </div>
                <Event_Modal
                  show={this.state.modalShow}
                  onHide={this.modalClose.bind(this)}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Events;
