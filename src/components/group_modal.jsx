import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import firebase from "firebase";
import "../comments.css";

var arr = [];
var fl = 0;

class Group_Modal extends Component {
  constructor(props) {
    super(props);
  }


  state = {
    comment: "",
    commentState: [],
  };

  //to create an array from firebase object
  firebaseToArray(snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;

      arr.push(item);
    });
    console.log(arr);
    this.setState({ commentState: arr });
    return arr;
  }

  //to insert comment for a specific group in db
  insertComment() {
    firebase
      .database()
      .ref("group_comments")
      .push({
        post: localStorage.getItem("postId"),
        comment: this.state.comment,
        comment_username: localStorage.getItem("firstname"),
        comment_img_url:localStorage.getItem("user_img"),
        group_name: this.props.group_name,
        time: firebase.database.ServerValue.TIMESTAMP,
      });
  }

  retrieveCommentsInitial() {
    firebase
      .database()
      .ref("group_comments")
      .orderByChild("time")
      .once("value")
      .then((snapshot) => {
        // snapshot.forEach(item=>{
        //     console.log(snapshot.key());
        // })
        this.firebaseToArray(snapshot);
      });
  }

  incrementLike() {
    var x = parseInt(localStorage.getItem("like"));
    firebase
      .database()
      .ref("groups/" + localStorage.getItem("postId"))
      .set({
        username: localStorage.getItem("post_user"),
        firstname: localStorage.getItem("post_user_first"),
        post: localStorage.getItem("post"),
        group_name: this.props.group_name,
        like: x + 1,
        dislike: 0,
        img_url: localStorage.getItem("group_post_img"),
        image_url:localStorage.getItem("post_img_url_group"),
        liked_username: localStorage.getItem("username"),
        time: firebase.database.ServerValue.TIMESTAMP,
      });
  }


  Submit = (e) => {
    e.preventDefault();
    this.insertComment();
    // this.retrievePosts();
  };

  render() {
    if (fl == 0) {
      this.retrieveCommentsInitial();
      fl = 1;
    }
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          <img
              src={
                localStorage.getItem("post_img_url_group") ||
                "https://i.imgur.com/0LKZQYM.jpg"
              }
              width="35px"
              height="35px"
              class="rounded-circle mx-auto "
            />
            {localStorage.getItem("post_user_first")}'s Post:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="card_post p-3 mt-2">
            <div class="d-flex justify-content-between align-items-center">
              <div class="user d-flex flex-row align-items-center">
                {/* <img
                          src="https://i.imgur.com/0LKZQYM.jpg"
                          width="30"
                          class="user-img rounded-circle mr-2"
                        /> */}
                <span>
                  {/* <small class="font-weight-bold text-primary">
                            {localStorage.getItem("post_user") + ": "}
                          </small> */}
                  <small class="font-weight-bold">
                    {localStorage.getItem("post")}
                  </small>
                </span>
              </div>{" "}
            </div>
          </div>

          {/* if the post contains image then show the img tag */}
          {localStorage.getItem("group_post_img") === "" ? null : (
            <img
              className="mx-auto d-block back c"
              width="171px"
              height="180px"
              src={
                localStorage.getItem("group_post_img") ||
                "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200&r=pg&d=404"
              }
              style={{ marginTop: 70 }}
            ></img>
          )}

          {/* Like Button */}
          {localStorage
            .getItem("liked_username")
            .includes(localStorage.getItem("username").toString()) ? (
              <button
              disabled
              className="btn btn-warning"
              onClick={this.incrementLike.bind(this)}
            >
              Likes: {localStorage.getItem("like")}
            </button>
          ) : <button
          
          className="btn btn-warning"
          onClick={this.incrementLike.bind(this)}
        >
          Likes: {localStorage.getItem("like")}
        </button>}

          

          {/* for comments */}
          <form onSubmit={(e) => this.Submit(e)}>
            <input
              type="text"
              id="text_comment"
              className="form-control border-0 shadow-sm px-4 text-primary text"
              placeholder="Add your Comment"
              onChange={(e) => this.setState({ comment: e.target.value })}
            />

            <input
              type="submit"
              name="btn_comment"
              className="button_chat input_chat"
              // onClick={this.insertMessage.bind(this)}
              onClick={(e) => this.Submit(e)}
              value="Comment"
            />
          </form>
          <div class="row d-flex justify-content-center mt-50 mb-50">
            <div class="col-lg-12">
              <div class="card">
                {arr.reverse().map((item) =>
                  item.post == localStorage.getItem("postId") ? (
                    <div class="comment-widgets">
                      {/* <!-- Comment Row --> */}
                      <div class="d-flex flex-row comment-row m-t-0">
                        <div class="p-2">
                          <img
                            src={item.comment_img_url ||"https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583336/AAA/4.jpg"}
                            alt="user"
                            width="50"
                            class="rounded-circle"
                          />
                        </div>
                        <div class="comment-text w-100">
                          <h6 class="font-medium">{item.comment_username}</h6>
                          <span class="m-b-15 d-block">{item.comment}</span>

                       
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Group_Modal;
