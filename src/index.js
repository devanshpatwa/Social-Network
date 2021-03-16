import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import PersonallInfo_detailes from "./components/personallInfo_detailes";
import personalInfo from "./components/personalInfo";
import PersonalInfo_live from "./components/personalInfo_live";
import personallInfo_college from './components/personallInfo_college';
import PersonalInfo_about from './components/personalInfo_about';
import { Switch,BrowserRouter as Router, Route  } from "react-router-dom";
import update_profile from "./components/update_profile";
import Chat_List from "./components/chat_list";
import Chat_Window from "./components/chat_window";
import Home_menu from "./sidebar/home_menu";
import Header_home from "./header_footer/Header_home";
import Posts from "../src/posts.css";
import Login from "./components/login";
import "./index.css";
import HomePage from "./components/homepage";
import Groups from "./components/groups";
import Events from "./components/events";


ReactDOM.render(
    <Router>
<Switch>
  
<Route exact path="/" component={Login} />
      <Route exact path="/chatlist" component={Chat_List}></Route>
      <Route exact path="/menu" component={Home_menu}></Route>
      <Route exact path="/homepage" component={HomePage}></Route>
      <Route exact path="/chat/:username" component={Chat_Window}></Route>
      <Route exact path="/posts" component={Posts}></Route>
      <Route exact path="/Update" component={update_profile} />
      <Route exact path="/PersonalInfo" component={personalInfo} />
      <Route exact path="/events" component={Events}></Route>
      
      <Route exact path="/PersonallInfo_college" component={personallInfo_college} />
      <Route exact path="/PersonalInfo_live" component={PersonalInfo_live} />
      <Route exact path="/PersonalInfo_about" component={PersonalInfo_about} />
      <Route exact path="/PersonallInfo_detailes" component={PersonallInfo_detailes} />
      <Route exact path="/groups/:groupname" render={(props)=>(<Groups {...props}/>)}></Route>
    </Switch> 
    </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
