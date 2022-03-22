import './App.css';
import Header from './Components/Header'
import Signin from './Components/Signin'
import Sidebar from './Components/Sidebar'
import Body from './Components/Body'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
if (!firebase.apps.length) {
   firebase.initializeApp({
    apiKey: "AIzaSyDQduwzj1Z7NVCc2Vb_yIqahyoPH1eUOmQ",
  authDomain: "bank-e4204.firebaseapp.com",
  projectId: "bank-e4204",
  storageBucket: "bank-e4204.appspot.com",
  messagingSenderId: "921425745026",
  appId: "1:921425745026:web:b3fc3305d9cbb43899509b",
  measurementId: "G-JRF60V91LT"
   });
}else {
   firebase.app(); // if already initialized, use that one
}
const  auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
const [user] = useAuthState(auth);


  return (
    <div className="App">
      {user ? <Header /> : <div></div>}

    {user ? <div className="App_bottom" >
     
      <Sidebar />
      <Body />
    </div>
      :
      <Signin />
}
    </div>
  );
}

export default App;
