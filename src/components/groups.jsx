import React, { Component } from "react";
import firebase from "firebase";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import "../config";
import "../posts.css";
import Group_Modal from "./group_modal";
import { storage } from "../config";

import { Sidebar } from "../sidebar/sidebar";
import "../sidebar/home_menu.css";
import Header_home from "../header_footer/Header_home";

var arr = [];
var flag = 0;
var flag_group_modal = 0;

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username"),
      post: "",
      postState: [],
      like: "",
      dislike: 0,
      modalShow: false,
      group_name: this.props.match.params.groupname,
    };
  }

  //to insert post in db
  insertPost() {
    firebase
      .database()
      .ref("groups")
      .push({
        post: this.state.post,
        username: localStorage.getItem("username"),
        firstname: localStorage.getItem("firstname"),
        image_url: localStorage.getItem("user_img"),
        group_name: this.state.group_name,
        like: 0,
        liked_username: "Dev",
        img_url: "",
        time: firebase.database.ServerValue.TIMESTAMP,
      });
  }

  //to create an array from firebase object
  firebaseToArray(snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;

      arr.push(item);
    });
    console.log(arr);
    this.setState({ postState: arr });
    return arr;
  }

  retrievePostsInitial() {
    firebase
      .database()
      .ref("groups")
      .orderByChild("time")
      .once("value")
      .then((snapshot) => {
        // snapshot.forEach(item=>{
        //     console.log(snapshot.key());
        // })
        this.firebaseToArray(snapshot);
      });
  }

  //to retrieve the posts
  retrievePosts() {
    firebase
      .database()
      .ref("posts")
      .orderByChild("time")
      .limitToLast(1)
      .once("value")
      .then((snapshot) => {
        // snapshot.forEach(item=>{
        //     console.log(snapshot.key());
        // })
        this.firebaseToArray(snapshot);
      });
  }

  //for image upload
  handleImageUpload = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const uploadTask = storage
        .ref(`group_post_image/${image.name}`)
        .put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("group_post_image")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              this.setState({ image_url: url });
              //localStorage.setItem("group_post_img", url);

              //to push the entry in the group database
              firebase
                .database()
                .ref("groups")
                .push({
                  img_url: this.state.image_url,
                  post: this.state.post,
                  firstname: localStorage.getItem("firstname"),
                  image_url: localStorage.getItem("user_img"),
                  username: localStorage.getItem("username"),
                  group_name: this.state.group_name,
                  like: 0,
                  liked_username: "Dev",
                  time: firebase.database.ServerValue.TIMESTAMP,
                });
            });
        }
      );
    }
  };

  //modal pop up
  modalOpen(
    ky,
    username,
    firstname,
    post,
    like,
    time,
    img_url,
    liked_usernames,
    image_url
  ) {
    flag_group_modal = 1;
    this.setState({ modalShow: true });
    localStorage.setItem("postId", ky);
    localStorage.setItem("post_user", username);
    localStorage.setItem("post_user_first", firstname);
    localStorage.setItem("post", post);
    localStorage.setItem("like", like);
    localStorage.setItem("time", time);
    localStorage.setItem("post_img_url_group", image_url);
    if (typeof img_url === "undefined") {
      localStorage.setItem("group_post_img", "");
    } else {
      localStorage.setItem("group_post_img", img_url);
    }
    if (typeof liked_usernames === "undefined") {
      localStorage.setItem("liked_username", "");
    } else {
      localStorage.setItem("liked_username", liked_usernames);
    }
  }

  modalClose() {
    this.setState({ modalShow: false });
    localStorage.setItem("group_post_img", "null");
    window.location.reload(true);
  }

  Submit = (e) => {
    e.preventDefault();
    this.insertPost();
    this.retrievePosts();
  };

  render() {
    if (flag == 0) {
      this.retrievePostsInitial();
      console.log(arr.like);
      flag = 1;
    }

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
                <div class="row d-flex justify-content-center">
                  <div class="col-md-8">
                    <div class="card_post p-3 mt-2">
                      <div class=" justify-content-between align-items-center">
                        <div class="user  flex-row align-items-center">
                          <form onSubmit={(e) => this.Submit(e)}>
                            <input
                              type="text"
                              id="text_post"
                              className="form-control border-0 shadow-sm px-4 text-primary text"
                              placeholder="What's on your mind...???"
                              onChange={(e) =>
                                this.setState({ post: e.target.value })
                              }
                            />

                            <input
                              type="submit"
                              name="btn_post"
                              className="for-width-button"
                              // onClick={this.insertMessage.bind(this)}
                              onClick={(e) => this.Submit(e)}
                              value="Post"
                            />

                            <label className="for-width-button_browse">
                              Post Photo{" "}
                              <input
                                type="file"
                                hidden
                                id="imageInput"
                                onChange={this.handleImageUpload}
                              />
                            </label>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* to retrieve the posts and display it */}
              {this.state.postState.reverse().map((item) =>
                item.group_name == this.state.group_name ? (
                  <div class="container mt-5">
                    <div class="row d-flex justify-content-center">
                      <div class="col-md-8">
                        {/* for posts */}
                        {item.img_url == "" ? (
                          <button
                            class="btn_1"
                            onClick={(e) =>
                              this.modalOpen(
                                item.key,
                                item.username,
                                item.firstname,
                                item.post,
                                item.like,
                                item.time,
                                item.img_url,
                                item.liked_username,
                                item.image_url
                              )
                            }
                          >
                            <div class="card_post p-3 mt-2">
                              <div class="d-flex justify-content-between align-items-center">
                                <div class="user d-flex flex-row align-items-center">
                                  <img
                                    src={
                                      item.image_url ||
                                      "https://i.imgur.com/0LKZQYM.jpg"
                                    }
                                    width="35px"
                                    height="35px"
                                    class="rounded-circle mx-auto d-block"
                                  />
                                  <span>
                                    <small class="font-weight-bold text-primary">
                                      {item.firstname + ": "}
                                    </small>
                                    <small class="font-weight-bold">
                                      {item.post}{" "}
                                    </small>
                                  </span>
                                </div>{" "}
                                <small>
                                  {" " +
                                    new Date(item.time).toLocaleDateString(
                                      "en-US"
                                    )}
                                </small>
                              </div>

                              <div class="action d-flex justify-content-between mt-2 align-items-center">
                                <div class="reply px-4">
                                  <small>Likes: {item.like}</small>
                                  {/* <span class="dots"></span>  */}
                                </div>
                              </div>
                            </div>
                          </button>
                        ) : (
                          //  for post with image
                          <button
                            class="btn_1"
                            onClick={(e) =>
                              this.modalOpen(
                                item.key,
                                item.username,
                                item.firstname,
                                item.post,
                                item.like,
                                item.time,
                                item.img_url,
                                item.liked_username,
                                item.image_url
                              )
                            }
                          >
                            <div class="card_post p-3 mt-2">
                              <div class="d-flex justify-content-between align-items-center">
                                <div class="user d-flex flex-row align-items-center">
                                <img
                                    src={
                                      item.image_url ||
                                      "https://i.imgur.com/0LKZQYM.jpg"
                                    }
                                    width="35px"
                                    height="35px"
                                    class="rounded-circle mx-auto d-block"
                                  />
                                  <span>
                                    <small class="font-weight-bold text-primary">
                                    {item.firstname + ": "}
                                    </small>
                                    <small class="font-weight-bold">
                                      {item.post}{" "}
                                    </small>
                                  </span>
                                </div>{" "}
                                <small>
                                  {" " +
                                    new Date(item.time).toLocaleDateString(
                                      "en-US"
                                    )}
                                </small>
                              </div>
                              <div>
                                <img
                                  className="mx-auto d-block back c"
                                  width="500px"
                                  height="600px"
                                  src={
                                    item.img_url ||
                                    "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200&r=pg&d=404"
                                  }
                                  style={{ marginTop: 70 }}
                                ></img>
                              </div>

                              <div class="action d-flex justify-content-between mt-2 align-items-center">
                                <div class="reply px-4">
                                  <small>Likes: {item.like}</small>
                                  {/* <span class="dots"></span>  */}
                                </div>
                              </div>
                            </div>
                          </button>
                        )}
                        {/* {flag_group_modal == 1 ? ( */}
                          <Group_Modal
                            show={this.state.modalShow}
                            onHide={this.modalClose.bind(this)}
                            ky={item.key}
                            group_name={this.state.group_name}
                          />
                        {/* ) : null} */}
                      </div>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Groups;
