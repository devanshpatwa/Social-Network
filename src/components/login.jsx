import React, { Component, Fragment } from "react";
import LoginRight from "./login_right";
import SignupRight from "./signup_right";
import {Switch,BrowserRouter as Router,Route} from "react-router-dom";

class Login extends Component {
  state = {
    isEdit:false,
    isLogin:false
  };

handleClick = () =>{
  
  if(this.state.isEdit==false){
    this.setState({isEdit:true});
  }else{
    this.setState({isEdit:false});
  }
}

onChangeLoginFlag(flag){
  this.setState({isLogin:flag})
}

  render() {
    return (

<div className="container-fluid">
<div className="row">
  {/* For Half Image Left Side*/}
  <div className="col-md-6 bg-image" />
  {/* For Content Right Side */}
  <div className="col-md-6 bg-light">
    <div className="login d-flex align-items-center">
    {/* {this.state.isLogin ? (<Tempp/>) : (<LoginRight onChangeLogin={this.onChangeLoginFlag.bind(this)} onhandleClick={this.handleClick}/>)} */}
      {!(this.state.isEdit) ? <LoginRight onChangeLogin={this.onChangeLoginFlag.bind(this)} onhandleClick={this.handleClick}/> : <SignupRight onhandleClick={this.handleClick}/>}
    </div>
  </div>
</div>

</div>
    ); 
  }
}

export default Login;
