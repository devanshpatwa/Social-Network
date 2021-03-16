import React, { Component } from "react";
import "../config";
import firebase from "firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
var flag_signup = 0;
var chk=0;
class SignupRight extends Component {
  state = {
    email: "",
    data: [],
    flag: 0,
    password: "",
    gender: "",
    first:"",
    last:"",
  };

  // for notifications
  Notify = () => {
    toast.success("Successfully Signed Up..Continue with Login !!!");
  };

  Notify_email_exists = () => {
    toast.warn("Email already exists !!!");
  };

  Notify_email_conestoga = () => {
    toast.warn("Only Conestoga Registered Email allowed !!!");
  };

  validateEmail(email) { 
    // var re = "/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/";
    // if(re.test(email)){
        //Email valid. Procees to test if it's from the right domain (Second argument is to check that the string ENDS with this domain, and that it doesn't just contain it)
        if(email.indexOf("@conestogac.on.ca", email.length - "@conestogac.on.ca".length) !== -1){
            return true;
        }else{
          return false;
        }
    // }
}

  //to check if the database already has entered email
  Check_email = () => {
    if(this.validateEmail(this.state.email)){
    firebase
      .database()
      .ref("users")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((item) => {
          if (item.val().email != this.state.email) {
            flag_signup = 1;
            console.log("email");
             
          }
        });
        if (flag_signup == 1) {
          this.Notify();
          firebase.database().ref("users").push({
            firstname:this.state.first,
            lastname:this.state.last,
            username: this.state.email,
            email: this.state.email,
            password: this.state.password,
            gender: this.state.gender,
          });
        }
      });
    }else{
      this.Notify_email_conestoga();
    }
  };

  // Called on Submit button click
  Submit = (e) => {
    e.preventDefault();
    this.Check_email();
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-7 mx-auto">
            <h3 className="display-4">Sign Up!</h3>
            <p className="text-muted mb-4"></p>
            <form onSubmit={(e)=>this.Submit(e)}>
              <div className="form-group mb-3 a">
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  required
                  autofocus
                  className="form-control border-0 shadow-sm px-4"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>
              <div className="form-group mb-3 a">
                <input
                  id="first"
                  type="text"
                  placeholder="First Name"
                  required
                  autofocus
                  className="form-control border-0 shadow-sm px-4"
                  onChange={(e) => this.setState({ first: e.target.value })}
                />
              </div>
              <div className="form-group mb-3 a">
                <input
                  id="last"
                  type="text"
                  placeholder="Last Name"
                  required
                  autofocus
                  className="form-control border-0 shadow-sm px-4"
                  onChange={(e) => this.setState({ last: e.target.value })}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="form-control border-0 shadow-sm px-4 text-primary"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>

              <div className="form-group mb-3">
                <div class="form-check-inline">
                  <label class="form-check-label">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="gender"
                      value="Male"
                      onChange={(e) =>
                        this.setState({ gender: e.target.value })
                      }
                    />
                    Male
                  </label>
                </div>
                <div class="form-check-inline">
                  <label class="form-check-label">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="gender"
                      value="Female"
                      onChange={(e) =>
                        this.setState({ gender: e.target.value })
                      }
                    />
                    Female
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block text-uppercase mb-2 shadow-sm"
                
              >
                Sign Up
              </button>
              <div className="text-center d-flex justify-content-between mt-4">
                <p>
                  <button
                    className="text-center font-italic text-muted btn btn-link"
                    onClick={() => this.props.onhandleClick()}
                  >
                    {" "}
                    Already a member? Log-in
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupRight;
