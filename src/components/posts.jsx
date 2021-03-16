import React, { Component } from "react";
import firebase from "firebase";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import "../config";

import { storage } from "../config";
import "../posts.css";
import Post_Modal from "./post_modal";

var arr = [];
var flag = 0;

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username"),
      post: "",
      postState: [],
      like: "",
      dislike: 0,
      modalShow: false,
    };
  }

  //to insert post in db
  insertPost() {
    firebase
      .database()
      .ref("posts")
      .push({
        post: this.state.post,
        username: localStorage.getItem("username"),
        firstname: localStorage.getItem("firstname"),
        image_url: localStorage.getItem("user_img"),
        like: 0,
        dislike: 0,
        liked_usernames: "Dev",
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

    this.setState({ postState: arr });
    return arr;
  }

  retrievePostsInitial() {
    firebase
      .database()
      .ref("posts")
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
        .ref(`post_image/${image.name}`)
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
            .ref("post_image")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              this.setState({ image_url: url });
              //localStorage.setItem("group_post_img", url);

              //to push the entry in the group database
              firebase
                .database()
                .ref("posts")
                .push({
                  img_url: this.state.image_url,
                  post: this.state.post,
                  firstname: localStorage.getItem("firstname"),
                  image_url: localStorage.getItem("user_img"),
                  username: localStorage.getItem("username"),
                  like: 0,
                  liked_username: "Dev",
                  time: firebase.database.ServerValue.TIMESTAMP,
                });
            });
        }
      );
    }
  };

  Submit = (e) => {
    e.preventDefault();
    this.insertPost();
    this.retrievePosts();
  };

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
    this.setState({ modalShow: true });
    localStorage.setItem("postId", ky);
    localStorage.setItem("post_user", username);
    localStorage.setItem("post_user_first", firstname);
    localStorage.setItem("post", post);
    localStorage.setItem("like", like);
    localStorage.setItem("time", time);
    localStorage.setItem("post_img_url", image_url);
    if (typeof img_url === "undefined") {
      localStorage.setItem("post_img", "");
    } else {
      localStorage.setItem("post_img", img_url);
    }
    if (typeof liked_usernames === "undefined") {
      localStorage.setItem("liked_username", "");
    } else {
      localStorage.setItem("liked_username", liked_usernames);
    }
  }

  modalClose() {
    this.setState({ modalShow: false });
    localStorage.setItem("post_img", "null");
    window.location.reload(true);
  }

  render() {
    if (flag == 0) {
      this.retrievePostsInitial();
      console.log(arr.like);
      flag = 1;
    }

    return (
      <React.Fragment>
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
                        className="form-control border-0 shadow-sm px-4 text-primary text for-width"
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

        {this.state.postState.reverse().map((item) => (
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
                            item.image_url || "https://i.imgur.com/0LKZQYM.jpg"
                          }
                          width="35px"
                          height="35px"
                          class="rounded-circle mx-auto d-block"
                        />
                        <span>
                          <small class="font-weight-bold text-primary">
                            {item.firstname + ": "}
                          </small>
                          <small class="font-weight-bold">{item.post} </small>
                        </span>
                      </div>{" "}
                      <small>
                        {" " + new Date(item.time).toLocaleDateString("en-US")}
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

                <Post_Modal
                  show={this.state.modalShow}
                  onHide={this.modalClose.bind(this)}
                  ky={item.key}
                />
              </div>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default Posts;
