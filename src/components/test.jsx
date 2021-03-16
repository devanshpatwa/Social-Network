import React, { Component, Fragment } from "react";
import "../components/profile.css";
import ProfileImage from "./profile_img";
import PersonallInfo_detailes from "./personallInfo_detailes";
import { Link } from "react-router-dom";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from '../header_footer/Header'; //Include Heder
import c from '../images/c.jpg';

import '../config';
import firebase from 'firebase';
class personalInfo_about extends Component {
  
  state = {
    mobile:"",
    degree:"",
    university:"",
    facebook:"",
    twitter:"",
    instagram:"",
    about:"",
    flag:0

  };

componentDidMount(){
  firebase.database().ref("users").once("value").then(snapshot=>{
    snapshot.forEach(item=>{
      if(item.val().firstname==="Delara"){
        const mobile=item.val().mobile;
        const degree=item.val().degree;
        const university=item.val().university;
        const facebook=item.val().facebook;
        const twitter=item.val().twitter;
        const instagram=item.val().instagram;
        const about=item.val().about;
        this.setState({mobile})
        this.setState({degree})
        this.setState({university})
        this.setState({facebook})
        this.setState({twitter})
        this.setState({instagram})
        this.setState({about})
      }
    })
  })
}
 

Submit=e=>{
 e.preventDefault();
 firebase.database().ref("users").push({
  mobile:this.state.mobile,
  degree:this.state.degree,
  university:this.state.university,
  facebook:this.state.facebook,
  twitter:this.state.twitter,
  instagram:this.state.instagram,
  city:this.state.city,
  country:this.state.country,
  about:this.state.about
 });
}

 
  render() {
    const fullname=this.state.name + " " +this.state.lastname;
    const mobile=this.state.mobile;
    const degree=this.state.degree;
    const university=this.state.university;
    const facebook=this.state.facebook;
    const twitter=this.state.twitter;
    const instagram=this.state.instagram;
    const about=this.state.about;
    return (
      <div >
        <div className="main-content">
          {/* Header */}
          <Header/>
          <div
            className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
            style={{
              minHeight: 200,
              
              // backgroundColor: "#2D2D2D",
              backgroundImage: `url(${c})`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          >
            {/* Mask */}
            <span className="mask opacity-8" />
            {/* <span className="mask bg-gradient-default opacity-8" /> */}
            {/* Header container */}
            <div className="container-fluid d-flex align-items-center">
              <div className="row">
                <div className="col-lg-7 col-md-10 mt-5">
                  {/* <h1 className="display-2 text-white">Hello User</h1> */}
                  <p className="text-white mt-0 mb-5">
                    This is your profile page. You can manage your information
                    here.
                  </p>
                  <a href="#!" className="btn btn-info">
                    Edit profile
                  </a>
                </div>
              </div>
            </div>
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
                  <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    {/* <div className="d-flex justify-content-between">
                      <a href="#" className="btn btn-sm btn-info mr-4">
                        Connect
                      </a>
                      <a
                        href="#"
                        className="btn btn-sm btn-default float-right"
                      >
                        Message
                      </a>
                    </div> */}
                  </div>
                  <div className="card-body pt-0 pt-md-4">
                    <div className="row">
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center mt-md-5"></div>
                      </div>
                    </div>
                    <div>
                      
                      <h3>
                      <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                               {/* {fullname} */}
                              </label><br></br>
                              <Router>
                              {/* <NavLink to='/p'>{PersonalInfo_live}</NavLink> */}

                              
                              
                              <div>
                         
                              <a href="/" type="button" class="btn btn-light btn-block">Personal Information</a><br/>
                               <a href="/PersonallInfo_college" type="button" class="btn btn-light btn-block ">College Information</a><br/> 
                               <a href="/PersonalInfo_live" type="button" class="btn btn-light btn-block">Place Lived</a><br/>
                              <a href="/PersonalInfo_about" type="button" class="btn btn-outline-warning btn-block active">Detailes About me</a>
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
                        <span className="text-secondary">link</span>
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
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </svg>
                          Instagram
                        </h6>
                        <span className="text-secondary">link</span>
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
                        <span className="text-secondary">link</span>
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
                  <div className="col-4 text-right">
                      
                      </div>
                    <form onSubmit={(e)=>this.Submit(e)} >
                      <h6 className="heading-small text-muted mb-4 glyphicon glyphicon-user">
                        Education
                      </h6>
                      
  
                      <div className="pl-lg-12">
                        <div className="row">


       


    <label for="inputDegree" class="col-sm-2 col-form-label">Last Degree</label>
        <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" id="inputDegree" value={degree} />
        
    </div>
    <hr/>
    <h6 className="heading-small text-muted mb-4 glyphicon glyphicon-user">
                        Contact Information
                      </h6><br/>
                      <label for="inputNumber" class="col-sm-2 col-form-label">Mobile</label>
        <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" id="inputNumber" value={mobile} />
        
    </div>

    <hr/>
    <h6 className="heading-small text-muted mb-4 glyphicon glyphicon-user">
                       
                      </h6>
                      <label for="inputAbout" class="col-sm-2 col-form-label">About me</label>
        <div class="col-sm-10">
            <input type="text"  class="form-control-plaintext" id="inputAbout" value={about} />
        
    </div>
    

    



                       
                          {/* <div className="col-lg-6">
                            <div className="form-group focused">
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Username
                              </label>
                              <input
                                type="text"
                                id="input-username"
                                className="form-control form-control-alternative"
                                placeholder="Username"
                                defaultValue="username"
                                onChange={e=>this.setState({username:e.target.value})}
                            
                              />
                            </div>
                          </div> */}
                          
                       
           
                 

                         
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
    );
  }
}

export default personalInfo_about;
