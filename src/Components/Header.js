import './Header.scss';
import { Button, ButtonGroup } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
function Header() {
  const  auth = firebase.auth();

  const signInWithGoogle = () => {

    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
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

      <div className="Header_right">
        
        <button onClick={() => auth.signOut()} className="button">
          Signout
          <div class="button__horizontal"></div>
          <div class="button__vertical"></div>
        </button>
      </div>
    </div>
  );
}

export default Header;
