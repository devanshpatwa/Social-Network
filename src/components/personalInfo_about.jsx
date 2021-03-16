import React, { Component, Fragment } from "react";
import "../components/profile.css";
import ProfileImage from "./profile_img";
import PersonallInfo_detailes from "./personallInfo_detailes";
import { Link } from "react-router-dom";

import LinkedCameraIcon from "@material-ui/icons/LinkedCamera";
import CoverPhoto from "../images/default_cover.jpg";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../header_footer/Header"; //Include Heder
import c from "../images/c.jpg";

import { Sidebar } from "../sidebar/sidebar";
import "../sidebar/home_menu.css";
import Header_home from "../header_footer/Header_home";

import "../config";
import firebase from "firebase";
class personalInfo_about extends Component {
  state = {
    mobile: "",
    degree: "",
    university: "",
    facebook: "",
    twitter: "",
    instagram: "",
    about: "",
    flag: 0,
  };

  componentDidMount() {
    firebase
      .database()
      .ref("users")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((item) => {
          if (item.val().firstname === localStorage.getItem("firstname")) {
            const mobile = item.val().mobile;
            const degree = item.val().degree;
            const university = item.val().university;
            const facebook = item.val().facebook;
            const twitter = item.val().twitter;
            const instagram = item.val().instagram;
            const about = item.val().about;
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

  Submit = (e) => {
    e.preventDefault();
    firebase.database().ref("users").push({
      mobile: this.state.mobile,
      degree: this.state.degree,
      university: this.state.university,
      facebook: this.state.facebook,
      twitter: this.state.twitter,
      instagram: this.state.instagram,
      city: this.state.city,
      country: this.state.country,
      about: this.state.about,
    });
  };

  render() {
    const fullname = this.state.name + " " + this.state.lastname;
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
              style={{ backgroundColor: "#344955"}}
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
                            <div>
                              <h3>
                                <label
                                  className="form-control-label form-control1-label"
                                  htmlFor="input-username"
                                >
                                  {/* {fullname} */}
                                </label>
                                <br></br>
                                <Router>
                                  {/* <NavLink to='/p'>{PersonalInfo_live}</NavLink> */}

                                  <div>
                                    <a
                                      href="/"
                                      type="button"
                                      class="btn btn-light btn-block"
                                    >
                                      Personal Information
                                    </a>
                                    <br />
                                    <a
                                      href="/PersonallInfo_college"
                                      type="button"
                                      class="btn btn-light btn-block "
                                    >
                                      College Information
                                    </a>
                                    <br />
                                    <a
                                      href="/PersonalInfo_live"
                                      type="button"
                                      class="btn btn-light btn-block"
                                    >
                                      Place Lived
                                    </a>
                                    <br />
                                    <a
                                      href="/PersonalInfo_about"
                                      type="button"
                                      class="btn btn-outline-warning btn-block active"
                                    >
                                      Details About me
                                    </a>
                                  </div>
                                </Router>
                              </h3>

                              <hr className="my-4" />
                              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-twitter mr-2 icon-inline text-info"
                                  >
                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                  </svg>
                                  Twitter
                                </h6>
                                <span
                                  className="text-secondary"
                                  style={{ fontSize: 10 }}
                                >
                                  {twitter}
                                </span>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-instagram mr-2 icon-inline text-danger"
                                  >
                                    <rect
                                      x={2}
                                      y={2}
                                      width={20}
                                      height={20}
                                      rx={5}
                                      ry={5}
                                    />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line
                                      x1="17.5"
                                      y1="6.5"
                                      x2="17.51"
                                      y2="6.5"
                                    />
                                  </svg>
                                  Instagram
                                </h6>
                                <span
                                  className="text-secondary"
                                  style={{ fontSize: 10 }}
                                >
                                  {instagram}
                                </span>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-facebook mr-2 icon-inline text-primary"
                                  >
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                  </svg>
                                  Facebook
                                </h6>
                                <span
                                  className="text-secondary"
                                  style={{ fontSize: 10 }}
                                >
                                  {facebook}
                                </span>
                              </li>

                              {/* <button
                        onClick={() => this.props.handleShowMoreClick()}
                        className="btn btn-link"
                      >
                        Show more
                      </button> */}
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
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="col-4 text-right"></div>
                            <form onSubmit={(e) => this.Submit(e)}>
                              <h6 className="heading-small text-muted mb-4 glyphicon glyphicon-user">
                                Education
                              </h6>

                              <div className="pl-lg-4">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="form-group focused">
                                      <label
                                        className="form-control1-label form-control-label"
                                        htmlFor="input-lastdegree"
                                      >
                                        Last Degree
                                      </label>
                                      <input
                                        type="text"
                                        readOnly={true}
                                        id="input-lastdegree"
                                        className="form-control form-control-alternative form-control1 form-control1-alternative"
                                        placeholder="Last Degree"
                                        Value={degree}
                                        onChange={(e) =>
                                          this.setState({
                                            lastdegree: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <hr />
                              <h6 className="heading-small text-muted mb-4 glyphicon glyphicon-user">
                                Contact Information
                              </h6>

                              <div className="pl-lg-4">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="form-group focused">
                                      <label
                                        className="form-control-label form-control1-label"
                                        htmlFor="input-Mobile"
                                      >
                                        Mobile
                                      </label>
                                      <input
                                        type="text"
                                        readOnly={true}
                                        id="input-Mobile"
                                        className="form-control form-control-alternative form-control1 form-control1-alternative"
                                        placeholder="Last Mobile"
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

                              <hr />
                              <h6 className="heading-small text-muted mb-4 glyphicon glyphicon-user">
                                About
                              </h6>

                              <div className="col-lg-6">
                                <div className="form-group focused">
                                  <label
                                    className="form-control-label form-control1-label"
                                    htmlFor="input-last-about"
                                  >
                                    About me
                                  </label>
                                  <input
                                    readOnly={true}
                                    type="text"
                                    id="input-about"
                                    className="form-control form-control-alternative form-control1 form-control1-alternative"
                                    Value={about}
                                    onChange={(e) =>
                                      this.setState({ about: e.target.value })
                                    }
                                  />
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

export default personalInfo_about;
