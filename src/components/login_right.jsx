import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';
import {Redirect} from "react-router";

import "../config";
import firebase from 'firebase'; 
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../index.js';

//Configure Toast Starts
toast.configure();
//Configure Toast Ends

var f=0;
var f_url=0;
var flag_local=0;

class LoginRight extends Component {
  state = {
    flag:0,
    email:"",
    password:"",
    red:true
  };

  // for Error Notifications
   Notify = () =>{
    toast.error('Invalid Username or Password');
  }

  
 

  //On click of Log in button, code will be executed
  check=()=>{
    firebase.database().ref("users").once("value").then(snapshot => {
      snapshot.forEach(item=>{
        // this.state.data.push({id:item.key,email:item.val().email})
        if(item.val().email===this.state.email && item.val().password===this.state.password
        && item.val().block===0){
         f=1;
          localStorage.setItem("flag_login","1")
          localStorage.setItem("username",item.val().username);
          localStorage.setItem("firstname",item.val().firstname);
          localStorage.setItem("password",item.val().password);
          localStorage.setItem("email",item.val().email);
          localStorage.setItem("user_img",item.val().img);
        }
        if(f===1){
        }else{
          localStorage.setItem("flag_login","0")
          //  this.Notify();
        }
      })
    })

   
      //fetch url for logged in user
      firebase.database().ref("images").once("value").then(snapshot => {
       snapshot.forEach(item=>{
         if(item.val().username===localStorage.getItem("username")){
          f_url=1;
          localStorage.setItem("user_img",item.val().img);
         }
         if(f_url==1){
            
         }
       })
     })

     //fetch url for logged in user for cover photo
     firebase.database().ref("cover_images").once("value").then(snapshot => {
      snapshot.forEach(item=>{
        if(item.val().username===localStorage.getItem("username")){
         f_url=1;
         localStorage.setItem("user_img_cover", item.val().img);
        }
        if(f_url==1){
           
        }
      })
    })


  }

  render() {
    if(flag_local==0){
      window.localStorage.clear();
      flag_local=1;
    }
    return (
    
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-7 mx-auto">
            <h3 className="display-4">Welcome!</h3>
            <p className="text-muted mb-4">Login with your credentials.</p>
            <form onSubmit={(e)=>this.Submit(e)}>
              <div className="form-group mb-3 a">
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  required
                  autofocus
                  className="form-control border-0 shadow-sm px-4"
                  onChange={e=>this.setState({email:e.target.value})}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="form-control border-0 shadow-sm px-4 text-primary"
                  onChange={e=>this.setState({password:e.target.value})}
                />
              </div>
              {/* <div className="custom-control custom-checkbox mb-3">
                <input
                  id="passwordCheck"
                  type="checkbox"
                  defaultChecked
                  className="custom-control-input"
                />
                <label htmlFor="passwordCheck" className="custom-control-label">
                  Remember password
                </label>
              </div> */}
             
              {/* <button
                type="submit"
                className="btn btn-primary btn-block text-uppercase mb-2 shadow-sm"
                onClick={this.check.bind(this)}
                Redirect to="/tempp"
              >
                Sign in
              </button> */}
             <h3> <Link
              to={{
                pathname:'/homepage',
                // state:{
                //   email:this.state.email,
                //   password:this.state.password,
                //   ch:this.state.flag
                // },
                 onClick:this.check()
              }}>Login</Link></h3>

          
              <div className="text-center d-flex justify-content-between mt-4">
                <p>
                  <button onClick={()=>this.props.onhandleClick()} className="text-center font-italic text-muted btn btn-link">Not a member? Signup</button>        
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginRight;
