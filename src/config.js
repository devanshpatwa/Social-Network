import firebase from 'firebase';
import "firebase/storage";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBrcvgztPYe9u_6cmm94YEgvfaMyk86pEA",
    authDomain: "social-21bfb.firebaseapp.com",
    databaseURL: "https://social-21bfb-default-rtdb.firebaseio.com",
    projectId: "social-21bfb",
    storageBucket: "social-21bfb.appspot.com",
    messagingSenderId: "239538571792",
    appId: "1:239538571792:web:58a450bc72dd24af765895"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage=firebase.storage();
  export{storage,firebase as default};