import './Header.scss';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
function Signin() {
  const  auth = firebase.auth();

  const signInWithGoogle = () => {

    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
      <div>
    <div className="Header">
    <div className="wrapper">
      <div className="letters">
        <span className="letter">B</span>
        <span className="letter">a</span>
        <span className="letter">n</span>
        <span className="letter">k</span>
        <span className="letter"> </span>
        <span className="letter">M</span>
        <span className="letter">a</span>
        <span className="letter">n</span>
        <span className="letter">a</span>
        <span className="letter">g</span>
        <span className="letter">e</span>
        <span className="letter">r</span>

    </div>
  </div>
  </div>
    <div className="App_signedout" >
        <h1>Bank Manager</h1>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
        

       </div>
       </div>

  );
}

export default Signin;
