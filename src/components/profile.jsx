import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import PersonallInfo_detailes from "./personallInfo_detailes";


// import ProfileImage from "./profile_img";
import personalInfo from "./personalInfo";
import PersonalInfo_live from "./personalInfo_live";
import personallInfo_college from './personallInfo_college';
import PersonalInfo_about from './personalInfo_about';
import Update_profile from "./update_profile";
import { Switch,BrowserRouter as Router, Route  } from "react-router-dom";
import update_profile from "./update_profile";
import Chat_List from "./chat_list";
// import Update_profile from "./update_profile";
import Chat_Window from "./chat_window";
import Home_menu from "../sidebar/home_menu";
import Header_home from "../header_footer/Header_home";
import Posts from "./posts";


class Profile extends Component {

  state = {
  };

  // handleShowMoreClick = () => {
  //   if (this.state.isFlag == true) {
  //     this.setState({ isFlag: false });
  //   } else {
  //     this.setState({ isFlag: true });
  //   }
  // };
  // updateclicked=()=>{
  //   if (this.state.isFlag == true) {
  //     this.setState({ isFlag: false });
  //   } else {
  //     this.setState({ isFlag: true });
  //   }
  // };

  render() {
    return (

    
      
      <React.Fragment>
      
           {/* {this.state.isFlag ? (
          <PersonalInfo updateclicked={this.updateclicked} />
        ) : (
          <Update_profile/>

        )} */}
<Router>
<Switch>
      <Route exact path="/chatlist" component={Chat_List}></Route>
      <Route exact path="/menu" component={Home_menu}></Route>
      <Route exact path="/home" component={Header_home}></Route>
      <Route exact path="/chat/:username" component={Chat_Window}></Route>
      <Route exact path="/" component={personalInfo} />
    <Route exact path="/posts" component={Posts}></Route>
      <Route exact path="/Update" component={update_profile} />
      <Route exact path="/PersonallInfo_college" component={personallInfo_college} />
      <Route exact path="/PersonalInfo_live" component={PersonalInfo_live} />
      <Route exact path="/PersonalInfo_about" component={PersonalInfo_about} />
      <Route exact path="/PersonallInfo_detailes" component={PersonallInfo_detailes} />
    </Switch> 
    </Router>
       
      
      </React.Fragment>
    );
  }
}

export default Profile;
