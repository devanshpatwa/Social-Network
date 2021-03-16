import React, { Component, Fragment } from "react";
import "../components/profile.css";
import ProfileImage from "./profile_img";
import PersonallInfo_detailes from "./personallInfo_detailes";
import { Link } from "react-router-dom";
import { Route, Router } from "react-router";
// import Header from '../header_footer/Header'; //Include Header
import Header_home from "../header_footer/Header_home";
import Home_menu from "../sidebar/home_menu";
import c from "../images/c.jpg";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { storage } from "../config";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";


import { Sidebar } from "../sidebar/sidebar";
import "../sidebar/home_menu.css";
import { toast } from "react-toastify";

import "../config";
import firebase from "firebase";
// import { IconButton } from "@material-ui/core";
import LinkedCameraIcon from "@material-ui/icons/LinkedCamera";
import CoverPhoto from "../images/default_cover.jpg";

var flag = 0;
var f_url = 0;
var flag_parent=0;
var parent = "";
toast.configure();
class update_profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      program: "",
      branch: "",
      city: "",
      country: "",
      age: "",
      degree: "",
      university: "",
      mobile: "",
      twitter: "",
      instagram: "",
      facebook: "",
      about: "",
      userList: "",
      setUserList: "",
      image_url: "",
      flag: 0,
      isFlag: true,
    };
  }

  img_check() {
    //fetch url for logged in user
    firebase
      .database()
      .ref("cover_images")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((item) => {
          if (item.val().username === localStorage.getItem("username")) {
            flag = 1;

            var ref = firebase.database().ref("cover_images");
            ref
              .orderByChild("username")
              .equalTo(localStorage.getItem("username"))
              .on("value", function (snapshot) {
                snapshot.forEach(function (child) {
                  parent = child.key;
                  // console.log(parent);
                });
              });
          }
        });
      });
  }

  handleImageUpload = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const uploadTask = storage.ref(`cover_image/${image.name}`).put(image);
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
            .ref("cover_image")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              this.setState({ image_url: url });
              localStorage.setItem("user_img_cover", url);

              if (flag == 0) {
                firebase
                  .database()
                  .ref("cover_images")
                  .push({
                    img: this.state.image_url,
                    username: localStorage.getItem("username"),
                  });
              } else {
                firebase
                  .database()
                  .ref("cover_images/" + parent)
                  .set({
                    username: localStorage.getItem("username"),
                    img: localStorage.getItem("user_img_cover"),
                  });
              }
            });
        }
      );
    }
  };

  componentDidMount() {
    firebase
      .database()
      .ref("users")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((item) => {
          if (item.val().firstname === localStorage.getItem("firstname")) {
            const username = item.val().username;
            const firstname = item.val().firstname;
            const lastname = item.val().lastname;
            const age = item.val().age;
            const email = item.val().email;
            const city = item.val().city;
            const country = item.val().country;
            const mobile = item.val().mobile;
            const degree = item.val().degree;
            const university = item.val().university;
            const facebook = item.val().facebook;
            const twitter = item.val().twitter;
            const instagram = item.val().instagram;
            const about = item.val().about;
            const program = item.val().program;
            const branch = item.val().branch;

            this.setState({ username });
            this.setState({ firstname });
            this.setState({ lastname });
            this.setState({ email });
            this.setState({ age });
            this.setState({ program });
            this.setState({ branch });
            this.setState({ city });
            this.setState({ country });
            this.setState({ mobile });
            this.setState({ degree });
            this.setState({ university });
            this.setState({ facebook });
            this.setState({ twitter });
            this.setState({ instagram });
            this.setState({ about });
          }
        });
      });
  }

  // check all the specific validations
  check_validations(){
    //for age validation
    if(this.state.age<16 && this.state.age!=""){
      toast.warn("Age should be between 16 and 50 !!!");
      return false;
    }
    if(this.state.age>50 && this.state.age!=""){
      toast.warn("Age should be between 16 and 50 !!!");
      return false;
    }
    

    return true;
  }

  Submit = (e) => {
    e.preventDefault();
    if(this.check_validations()){

    const database = firebase.database();
    var parent = "";
    var ref = firebase.database().ref("users");
    ref
      .orderByChild("firstname")
      .equalTo(localStorage.getItem("firstname"))
      .on("value", function (snapshot) {
        snapshot.forEach(function (child) {
          parent = child.key;
          console.log(parent);
          localStorage.setItem("parent_update_profile", parent);
        });
      });

    if (
      localStorage.getItem("parent_update_profile").toString() != "" &&
      typeof this.state.age != "undefined"
    ) {
      database
        .ref(
          "users/" + localStorage.getItem("parent_update_profile").toString()
        )
        .child("age")
        .set(this.state.age);
    } else {
      database
        .ref("users/" + parent)
        .child("age")
        .push(this.state.age);
    }

    if (
      localStorage.getItem("parent_update_profile").toString() != "" &&
      typeof this.state.lastname != "undefined"
    ) {
      database
        .ref(
          "users/" + localStorage.getItem("parent_update_profile").toString()
        )
        .child("lastname")
        .set(this.state.lastname);
    } else {
      database
        .ref("users/" + parent)
        .child("lastname")
        .push(this.state.lastname);
    }

    if (
      localStorage.getItem("parent_update_profile").toString() != "" &&
      typeof this.state.facebook != "undefined"
    ) {
      database
        .ref(
          "users/" + localStorage.getItem("parent_update_profile").toString()
        )
        .child("facebook")
        .set(this.state.facebook);
    } else {
      database
        .ref("users/" + parent)
        .child("facebook")
        .push(this.state.facebook);
    }

    if (
      localStorage.getItem("parent_update_profile").toString() != "" &&
      typeof this.state.city != "undefined"
    ) {
      database
        .ref(
          "users/" + localStorage.getItem("parent_update_profile").toString()
        )
        .child("city")
        .set(this.state.city);
    } else {
      database
        .ref("users/" + parent)
        .child("city")
        .push(this.state.city);
    }

    if (
      localStorage.getItem("parent_update_profile").toString() != "" &&
      typeof this.state.country != "undefined"
    ) {
      database
        .ref(
          "users/" + localStorage.getItem("parent_update_profile").toString()
        )
        .child("country")
        .set(this.state.country);
    } else {
      database
        .ref("users/" + parent)
        .child("country")
        .push(this.state.country);
    }

    if (
      localStorage.getItem("parent_update_profile").toString() != "" &&
      typeof this.state.degree != "undefined"
    ) {
      database
        .ref(
          "users/" + localStorage.getItem("parent_update_profile").toString()
        )
        .child("degree")
        .set(this.state.degree);
    } else {
      database
        .ref("users/" + parent)
        .child("degree")
        .push(this.state.degree);
    }

    if (
      localStorage.getItem("parent_update_profile").toString() != "" &&
      typeof this.state.university != "undefined"
    ) {
      database
        .ref(
          "users/" + localStorage.getItem("parent_update_profile").toString()
        )
        .child("university")
        .set(this.state.university);
    } else {
      database
        .ref("users/" + parent)
        .child("university")
        .push(this.state.university);
    }

    if (
      localStorage.getItem("parent_update_profile").toString() != "" &&
      typeof this.state.instagram != "undefined"
    ) {
      database
        .ref(
          "users/" + localStorage.getItem("parent_update_profile").toString()
        )
        .child("instagram")
        .set(this.state.instagram);
    } else {
      database
        .ref("users/" + parent)
        .child("instagram")
        .push(this.state.instagram);
    }

    if (
      localStorage.getItem("parent_update_profile").toString() != "" &&
      typeof this.state.twitter != "undefined"
    ) {
      database
        .ref(
          "users/" + localStorage.getItem("parent_update_profile").toString()
        )
        .child("twitter")
        .set(this.state.twitter);
    } else {
      database
        .ref("users/" + parent)
        .child("twitter")
        .push(this.state.twitter);
    }

    if (
      localStorage.getItem("parent_update_profile").toString() != "" &&
      typeof this.state.about != "undefined"
    ) {
      database
        .ref(
          "users/" + localStorage.getItem("parent_update_profile").toString()
        )
        .child("about")
        .set(this.state.about);
    } else {
      database
        .ref("users/" + parent)
        .child("about")
        .push(this.state.about);
    }

    if (
      localStorage.getItem("parent_update_profile").toString() != "" &&
      typeof this.state.program != "undefined"
    ) {
      database
        .ref(
          "users/" + localStorage.getItem("parent_update_profile").toString()
        )
        .child("program")
        .set(this.state.program);
    } else {
      database
        .ref("users/" + parent)
        .child("program")
        .push(this.state.program);
    }

    if (
      localStorage.getItem("parent_update_profile").toString() != "" &&
      typeof this.state.branch != "undefined"
    ) {
      database
        .ref(
          "users/" + localStorage.getItem("parent_update_profile").toString()
        )
        .child("branch")
        .set(this.state.branch);
    } else {
      database
        .ref("users/" + parent)
        .child("branch")
        .push(this.state.branch);
    }

    if (
      localStorage.getItem("parent_update_profile").toString() != "" &&
      typeof this.state.mobile != "undefined"
    ) {
      database
        .ref(
          "users/" + localStorage.getItem("parent_update_profile").toString()
        )
        .child("mobile")
        .set(this.state.mobile);
    } else {
      database
        .ref("users/" + parent)
        .child("mobile")
        .push(this.state.mobile);
    }
  }
  };

  // database.ref('users/'+parent).child("twitter").set(this.state.twitter);
  // database.ref('users/'+parent).child("facebook").set(this.state.facebook);
  // database.ref('users/'+parent).child("instagram").set(this.state.instagram);

  render() {
    if (f_url == 0) {
      this.img_check();
      const database = firebase.database();
    var parent = "";
    var ref = firebase.database().ref("users");
    ref
      .orderByChild("firstname")
      .equalTo(localStorage.getItem("firstname"))
      .on("value", function (snapshot) {
        snapshot.forEach(function (child) {
          parent = child.key;
          console.log(parent);
          localStorage.setItem("parent_update_profile", parent);
        });
      });
      f_url = 1;
    }

    // const fullname=this.state.name + " " +this.state.lastname;
    const username = this.state.username;
    const email = this.state.email;
    const firstname = this.state.firstname;
    const lastname = this.state.lastname;
    const program = this.state.program;
    const branch = this.state.branch;
    const age = this.state.age;
    const city = this.state.city;
    const country = this.state.country;
    const mobile = this.state.mobile;
    const degree = this.state.degree;
    const university = this.state.university;
    const facebook = this.state.facebook;
    const twitter = this.state.twitter;
    const instagram = this.state.instagram;
    const about = this.state.about;
    return (
      <React.Fragment>
        <Header_home />
        <div class="container-homepage">
          <div class="row">
            <div
              class="col-2"
              style={{ backgroundColor: "#344955" }}
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
              <div>
                <div className="main-content">
                  <div>
                    <img
                      src={localStorage.getItem("user_img_cover") || CoverPhoto}
                      className="cover_img_photo"
                    />
                    <label
                      className="btn btn-warning"
                      style={{ marginLeft: "92%", marginTop: "-25%" }}
                    >
                      <LinkedCameraIcon
                        style={{
                          fontSize: "xx-large",
                        }}
                      />

                      <input
                        type="file"
                        hidden
                        id="imageInput"
                        onChange={this.handleImageUpload}
                      />
                    </label>

                    {/* Mask */}
                    <span className="mask opacity-8" />
                    {/* <span className="mask bg-gradient-default opacity-8" /> */}
                    {/* Header container */}
                  </div>
                  {/* Page content */}
                  <div className="container-fluid mt--7">
                    <div className="row">
                      <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                        <div className="card card-profile shadow">
                          <div className="row justify-content-center">
                            <div className="col-lg-3 order-lg-2">
                              <div className="card-profile-image">
                                <a href="#">
                                  <ProfileImage />

                                  {/* <img
                            src="https://demos.creative-tim.com/argon-dashboard/assets/img/theme/team-4.jpg"
                            className="rounded-circle"
                          /> */}
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="card-body pt-0 pt-md-4">
                            <div className="row"></div>
                            <div className="text-center">
                              <div id="more_Info"></div>

                              {/* <a
                        href="/PersonallInfo_detailes" type="button"
                        className="btn btn-link"
                      >
                        Show more
                      </a> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-8 order-xl-1">
                        <div className="card bg-secondary shadow">
                          <div className="card-header bg-white border-0">
                            <div className="row align-items-center">
                              <div className="col-8">
                                <h3 className="mb-0">My account</h3>
                              </div>
                              {/* <div className="col-4 text-right">
                        <button className="btn btn-sm btn-primary">
                          save
                        </button>
                      </div> */}
                            </div>
                          </div>
                          <div className="card-body">
                            <form onSubmit={(e) => this.Submit(e)}>
                              <h6 className="heading-small text-muted mb-4">
                                User information
                              </h6>

                              <div className="pl-lg-4">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="form-group focused">
                                      <label
                                        className="form-control1-label"
                                        htmlFor="input-username"
                                      >
                                        Username
                                      </label>
                                      <input
                                        type="text"
                                        id="input-username"
                                        required
                                        className="form-control form-control1 form-control1-alternative"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) =>
                                          this.setState({
                                            username: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group">
                                      <label
                                        className="form-control1-label"
                                        htmlFor="input-email"
                                      >
                                        Email address
                                      </label>
                                      <input
                                        type="email"
                                        required
                                        id="input-email"
                                        className="form-control form-control1 form-control1-alternative"
                                        placeholder="email"
                                        value={email}
                                        onChange={(e) =>
                                          this.setState({
                                            email: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="form-group focused">
                                      <label
                                        className="form-control1-label"
                                        htmlFor="input-first-name"
                                      >
                                        First name
                                      </label>
                                      <input
                                        type="text"
                                        id="input-first-name"
                                        className="form-control form-control1 form-control1-alternative"
                                        placeholder="First name"
                                        value={firstname}
                                        onChange={(e) =>
                                          this.setState({
                                            name: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group focused">
                                      <label
                                        className="form-control1-label"
                                        htmlFor="input-last-name"
                                      >
                                        Last name
                                      </label>
                                      <input
                                        type="text"
                                        id="input-last-name"
                                        className="form-control form-control1 form-control1-alternative"
                                        placeholder="Last name"
                                        value={lastname}
                                        onChange={(e) =>
                                          this.setState({
                                            lastname: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <hr className="my-4" />
                              {/* Address */}
                              <h6 className="heading-small text-muted mb-4">
                                Collage information
                              </h6>

                              <div className="pl-lg-4">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="form-group focused">
                                      <label
                                        className="form-control1-label"
                                        htmlFor="input-program"
                                      >
                                        Program
                                      </label>
                                      <input
                                        type="text"
                                        id="input-program"
                                        className="form-control form-control1 form-control1-alternative"
                                        value={program}
                                        onChange={(e) =>
                                          this.setState({
                                            program: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group">
                                      <label
                                        className="form-control1-label"
                                        htmlFor="input-branch"
                                      >
                                        Conestoga colloge branch
                                      </label>
                                      <input
                                        type="text"
                                        id="input-branch"
                                        className="form-control form-control1 form-control1-alternative"
                                        value={branch}
                                        onChange={(e) =>
                                          this.setState({
                                            branch: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-lg-4">
                                    <div className="form-group focused">
                                      <label
                                        className="form-control1-label"
                                        htmlFor="input-city"
                                      >
                                        City
                                      </label>
                                      <input
                                        type="text"
                                        id="input-city"
                                        className="form-control form-control1 form-control1-alternative"
                                        placeholder="City"
                                        value={city}
                                        onChange={(e) =>
                                          this.setState({
                                            city: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-4">
                                    <div className="form-group focused">
                                      <label
                                        className="form-control1-label"
                                        htmlFor="input-country"
                                      >
                                        Country
                                      </label>
                                      <input
                                        type="text"
                                        id="input-country"
                                        className="form-control form-control1 form-control1-alternative"
                                        placeholder="Country"
                                        value={country}
                                        onChange={(e) =>
                                          this.setState({
                                            country: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-4">
                                    <div className="form-group">
                                      <label
                                        className="form-control1-label"
                                        htmlFor="input-age"
                                      >
                                        Age
                                      </label>
                                      <input
                                        type="number"
                                        id="input-postal-code"
                                        className="form-control form-control1 form-control1-alternative"
                                        placeholder=""
                                        value={age}
                                        onChange={(e) =>
                                          this.setState({ age: e.target.value })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <hr className="my-4" />
                              <h6 className="heading-small text-muted mb-4">
                                Education
                              </h6>

                              <div className="pl-lg-4">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="form-group focused">
                                      <label
                                        className="form-control1-label"
                                        htmlFor="input-username"
                                      >
                                        University/College
                                      </label>
                                      <input
                                        type="text"
                                        id="input-college"
                                        className="form-control form-control1 form-control1-alternative"
                                        // placeholder=""
                                        value={university}
                                        onChange={(e) =>
                                          this.setState({
                                            university: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group">
                                      <label
                                        className="form-control1-label"
                                        htmlFor="input-degree"
                                      >
                                        Last degree
                                      </label>
                                      <input
                                        type="text"
                                        id="input-degree"
                                        className="form-control form-control1 form-control1-alternative"
                                        Value={degree}
                                        onChange={(e) =>
                                          this.setState({
                                            degree: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <hr className="my-4" />
                              {/* Address */}
                              <h6 className="heading-small text-muted mb-4">
                                Contact Information
                              </h6>

                              <div className="pl-lg-4">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="form-group focused">
                                      <label
                                        className="form-control1-label"
                                        htmlFor="input-username"
                                      >
                                        Mobile
                                      </label>
                                      <input
                                        type="number"
                                        id="input-mobile"
                                        className="form-control form-control1 form-control1-alternative"
                                        placeholder="Mobile"
                                        Value={mobile}
                                        onChange={(e) =>
                                          this.setState({
                                            mobile: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <hr className="my-4" />
                              {/* Address */}
                              <h6 className="heading-small text-muted mb-4">
                                Social Media
                              </h6>

                              <div className="row">
                                <div className="col-lg-4">
                                  <div className="form-group focused">
                                    <label
                                      className="form-control1-label"
                                      htmlFor="input-social"
                                    >
                                      Twitter
                                    </label>
                                    <input
                                      type="text"
                                      id="input-city"
                                      className="form-control form-control1 form-control1-alternative"
                                      placeholder=""
                                      Value={twitter}
                                      onChange={(e) =>
                                        this.setState({
                                          twitter: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group focused">
                                    <label
                                      className="form-control1-label"
                                      htmlFor="input-country"
                                    >
                                      Instagram
                                    </label>
                                    <input
                                      type="text"
                                      id="input-country"
                                      className="form-control form-control1 form-control1-alternative"
                                      placeholder=""
                                      Value={instagram}
                                      onChange={(e) =>
                                        this.setState({
                                          instagram: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label
                                      className="form-control1-label"
                                      htmlFor="input-age"
                                    >
                                      Facebook
                                    </label>
                                    <input
                                      type="text"
                                      id="input-postal-code"
                                      className="form-control form-control1 form-control1-alternative"
                                      placeholder=""
                                      Value={facebook}
                                      onChange={(e) =>
                                        this.setState({
                                          facebook: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <hr className="my-4" />
                              {/* Description */}
                              <h6 className="heading-small text-muted mb-4">
                                Details about me
                              </h6>
                              <div className="pl-lg-4">
                                <div className="form-group focused">
                                  <label
                                    className="form-control1-label"
                                    htmlFor="input-about"
                                  >
                                    About Me
                                  </label>
                                  <textarea
                                    id="input-about"
                                    name="input-about"
                                    type="text"
                                    rows={4}
                                    className="form-control form-control1 z-depth-1 txtAbout"
                                    value={about}
                                    onChange={(e) =>
                                      this.setState({
                                        about: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="col-4 text-right">
                                  <button
                                    href="/PersonalInfo"
                                    type="submit"
                                    className="btn_color"
                                    onClick={(e) => this.Submit(e)}
                                  >
                                    save
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default update_profile;
