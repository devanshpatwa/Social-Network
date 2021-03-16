import React, { Component, Fragment } from "react";
import { useSpring, animated as a } from "react-spring";
import { useState } from "react";
import "../components/style.css";
// import firebase from '../config';
import "firebase/storage";
import "bootstrap/dist/css/bootstrap.css";
import { render } from "@testing-library/react";
import "../config";

import IconButton from "@material-ui/core/IconButton";
import { storage } from "../config";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import firebase from "firebase";
import { Button } from "@material-ui/core";
import { CgWindows } from "react-icons/cg";

var flag=0;
var f_url=0;
var parent="";

class ProfileImage extends Component {
  state = {
    image_url: "",
  };

  img_check(){
     //fetch url for logged in user
     firebase.database().ref("images").once("value").then(snapshot => {
      snapshot.forEach(item=>{
        if(item.val().username===localStorage.getItem("username")){
          flag=1;
          
          var ref = firebase.database().ref('images');
          ref.orderByChild('username').equalTo(localStorage.getItem("username")).on("value", function(snapshot) {
            snapshot.forEach((function(child) {
              parent=child.key;
              // console.log(parent); 
            }) )
         });
        }
      })
    })

  }

  handleImageUpload = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const uploadTask = storage.ref(`image/${image.name}`).put(image);
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
            .ref("image")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              this.setState({image_url:url})
              localStorage.setItem("user_img",url);

              if(flag==0){
                firebase.database().ref("images").push({
                  img:this.state.image_url,
                  username:localStorage.getItem("username"),
                })
              }else{
                firebase.database().ref("images/"+parent).set({
                  username:localStorage.getItem("username"),
                  img:localStorage.getItem("user_img")
                })
              }
            });
        } 
      );
     
    }
    
  };

  //for function of spring
  // const [flipped, set] = useState(false);
  // const selectedFile="";
  // const { transform, opacity } = useSpring({
  //   opacity: flipped ? 1 : 0,
  //   transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
  //   config: { mass: 5, tension: 500, friction: 80 },
  // });

  render() {
    if(f_url==0){
      this.img_check();
      f_url=1;
    }
    
    return (
      <React.Fragment>
        <div>
          <img
            className="rounded-circle mx-auto d-block back c"
            width="171px"
            height="180px"
            src={
              localStorage.getItem("user_img") ||
              "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200&r=pg&d=404"
            }
            style={{ marginTop: 70 }}
          ></img>

          <label
            className="btn btn-warning"
            style={{ marginTop: "250%", marginLeft:"-25%" }}
          >
            Choose photo{" "}
            <input
              type="file"
              hidden
              id="imageInput"
              onChange={this.handleImageUpload}
            />
          </label>
        </div>
      </React.Fragment>
    );
  }
}

//spring
// <div>
//   <div onClick={() => set((state) => !state)}>
//     <a.div
//       className="c back rounded-circle "
//       id="new-img"
//       style={{ opacity: opacity.interpolate((o) => 1 - o), transform }}
//     />
//     <a.div
//       className="c front rounded-circle"
//       style={{
//         opacity,
//         transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
//       }}
//     />
//     <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />
//                       <Tooltip title="Edit profile picture" placement="top">

//                            <IconButton onClick={this.handleSave,this.showImage} className="button" style={{marginTop:90,marginLeft:90}}>

//                         <AddAPhotoIcon  color="primary" />
//                       </IconButton>
//                         </Tooltip>
//   </div>

/* <img
          className="rounded-circle mx-auto d-block"
          width="171px"
          height="180px"
          src={require("../images/i.JPG")}
          alt="profileee_img"
        ></img> */

// render(<ProfileImage />, document.getElementById("root"));

export default ProfileImage;
