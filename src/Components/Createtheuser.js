import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

function Createtheuser(){

  const firestore = firebase.firestore();
  const auth = firebase.auth();
  const allRef = firestore.collection('AllUsers');
  const query = allRef;
  var grpid = '_' + Math.random().toString(36).substr(2, 9);
  const [users] = useCollectionData(query, {idField: 'id'});
  const{uid, photoURL, displayName, email} = auth.currentUser;
  const groupsRef = firestore.collection(`AllUsers/${email}/groups`);
  const groups2Ref = firestore.collection(`Allgroups`);;

  const bquery = allRef;
  const [banks] = useCollectionData(bquery, {idField: 'id'});


  const createuser = async() => {
      const{uid, photoURL, displayName, email} = auth.currentUser;

      await allRef.doc(email).set({

        id:email,
        name: displayName,
        User_name: email,
        Rating_amount: 1,


        uid,
        email,



      },{merge:true})

            await groupsRef.doc(`${email}personal`).set({

              name:'personal',
              grpid:`${email}personal`






            },{merge:true})
            await groups2Ref.doc(`${email}personal`).set({

              name:'personal',
              grpid: `${email}personal`






            },{merge:true})

}

createuser()

return(
  <></>
)
}
export default Createtheuser
