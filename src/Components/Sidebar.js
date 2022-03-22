import {useState} from 'react';
import './Sidebar.css';
import { Button, Drawer } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AccountBalanceTwoToneIcon from '@material-ui/icons/AccountBalanceTwoTone';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {pageswitch, ratingreset, accountswitch, bankswitch} from '../actions';
import {useSelector, useDispatch} from 'react-redux';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import StarBorder from '@material-ui/icons/StarBorder';
import AppsIcon from '@material-ui/icons/Apps';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '17vw',
    color: '#ECBA82',
    backgroundColor: '#204E4A',
  },
  icon:{
    color: '#ECBA82',
  },
  nested: {
    backgroundColor: '#373E40',
    paddingLeft: theme.spacing(4),
  },
  second: {
    backgroundColor: '#373E40',
    color: '#ECBA82',
  },
}));

function Sidebar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const  auth = firebase.auth();
  const firestore = firebase.firestore();
  const {uid, photoURL, displayName, email} = auth.currentUser;
  const banksRef = firestore.collection(`AllUsers/${email}/groups`);
  const bquery = banksRef;
  const [banks] = useCollectionData(bquery, {idField: 'id'});
  const [bankname, setbankname] = useState('');
  const [bankaddview, setbankaddview] = useState(false);


  const addbank = async() => {

    await banksRef.doc(bankname).set({
        name: bankname,
        Owner: displayName,
        accounts: '0'
      })
      setbankname('')
 }
  return (
    <div className="Sidebar">
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"

      className={classes.root}
    >
      <ListItem onClick={() =>{

                dispatch(pageswitch("Home"))


              }
            } button className={classes.root}>
        <ListItemIcon>
          <AppsIcon className={classes.icon} />
        </ListItemIcon >
        <ListItemText primary="Home" />
      </ListItem>
        <div className="Sidebar_banks_seperator"/>
      {banks && banks.map(bnk => <ASinglebank key ={bnk.id} bank={bnk} />)}



    </List>
  {/*  <div className="Sidebar">
      <div className="Sidebar_banks">
      <div className="Sidebar_banks_header">
      <h3>Banks</h3>

      </div>
        <div className="Sidebar_banks_seperator"/>
        <div onClick={() => setbankaddview(!bankaddview)} className="Sidebar_banks_add">
          <AddIcon />
        </div>
<div className="Sidebar_banks_seperator"/>
          <div  className={`Sidebar_banks_form_${bankaddview}`}>
          <h7>Name:</h7>
            <input placeholder={`Bank`} value ={bankname} onChange={(e) => setbankname(e.target.value)}/>
            <button onClick={() => {
              setbankaddview(!bankaddview)
              addbank()}}>ADD</button>
          </div>
          <div className="Sidebar_banks_seperator"/>
          //  {banks && banks.map(bnk => <Singlebank key ={bnk.id} bank={bnk} />)}


      </div>
    </div> */}
    </div>
  );
}
function ASinglebank(props){
  const  auth = firebase.auth();
  const firestore = firebase.firestore();
  const {uid, photoURL, displayName, email} = auth.currentUser;
  const {name, grpid} = props.bank;
  const grpRef = firestore.collection(`Allgroups`);
  const gquery = grpRef;
  const [groups] = useCollectionData(gquery, {idField: 'id'});
  return(<>
        {groups && groups.map(bnk => <Singlebank thisname={name} thisgrpid={grpid} key ={bnk.id} bank={bnk} />)}
    </>);
}
function Singlebank(props){
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = async() => {
    setOpen(!open);

  };
  const [actview, setactview] = useState(false);
  const dispatch = useDispatch();
  const  auth = firebase.auth();
  const firestore = firebase.firestore();
  const{uid, photoURL, displayName, email} = auth.currentUser;
  const {name, grpid} = props.bank;
  const actRef = firestore.collection(`AllUsers/${email}/groups/personal/accounts`);
  const grpRef = firestore.collection(`Allgroups/${grpid}/accounts`);
  const aquery = actRef;
  const [acts] = useCollectionData(aquery, {idField: 'id'});
  const gquery = grpRef;
  const [groups] = useCollectionData(gquery, {idField: 'id'});
  console.log(props.thisname)
  console.log(props.thisgrpid)
  if(1 =='personal'){
    console.log('here')
  return(<>
    <ListItem button  >
      <ListItemIcon onClick={() =>{
        dispatch(pageswitch("Home"))
        dispatch(pageswitch("Bank"))
        dispatch(ratingreset(0))
        dispatch(bankswitch(grpid))


              }
            } >
        <AccountBalanceIcon className={classes.icon}/>
      </ListItemIcon>
      <ListItemText primary={name} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse  in={open} timeout="auto" unmountOnExit>
      <List className={classes.second} component="div" disablePadding>
      {acts && acts.map(act => <SingleAct grpid={'personl'} actview={actview} key ={act.id} acct={act} />)}
      </List>
      </Collapse>

  <div className="Sidebar_banks_seperator"/>
  {  /*<div className={`Sidebar_banks_single_${actview}`}>
<div className={`Sidebar_banks_single_false`}>
    <AccountBalanceTwoToneIcon onClick={() =>{
          dispatch(pageswitch("Bank"))
        dispatch(bankswitch(name))
        }
      }  />
  </div>
    <h3>{name}</h3>

    <ArrowForwardIosIcon onClick={() => setactview(!actview)}/>

    </div>

<div className="Sidebar_banks_seperator"/> */}
    </>)}else if(props.thisgrpid == grpid){
      return(<>
        <ListItem button onClick={() =>{
                  handleClick()
                }
              } >
          <ListItemIcon onClick={() =>{
            dispatch(pageswitch("Home"))
            dispatch(pageswitch("Bank"))
            dispatch(ratingreset(0))
            dispatch(bankswitch(grpid))
                  }
                } >
            <AccountBalanceIcon className={classes.icon}/>
          </ListItemIcon>
          <ListItemText primary={name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
              in={open} timeout="auto" unmountOnExit>
          <List className={classes.second} component="div" disablePadding>
          {groups && groups.map(act => <SingleAct grpid={grpid} actview={actview} key ={act.id} acct={act} />)}
          </List>
          </Collapse>

      <div className="Sidebar_banks_seperator"/>
      {  /*<div className={`Sidebar_banks_single_${actview}`}>
    <div className={`Sidebar_banks_single_false`}>
        <AccountBalanceTwoToneIcon onClick={() =>{
              dispatch(pageswitch("Bank"))
            dispatch(bankswitch(name))
            }
          }  />
      </div>
        <h3>{name}</h3>

        <ArrowForwardIosIcon onClick={() => setactview(!actview)}/>

        </div>

    <div className="Sidebar_banks_seperator"/> */}
        </>)

    }else{return(<></>)};

}
function SingleAct(props){
  const dispatch = useDispatch();
  const  auth = firebase.auth();
  const firestore = firebase.firestore();
  const {uid, photoURL, displayName, email} = auth.currentUser;
  const {name, Balence, group, actid} = props.acct;
  const actRef = firestore.collection(`AllUsers/${email}/banks/${name}/accounts`);
  const aquery = actRef;
  const [accounts] = useCollectionData(aquery, {idField: 'id'});
  const createaccounts = async() => {
          await actRef.doc().set({
            name: "none"
          })
        }
        const classes = useStyles();
        const [open, setOpen] = React.useState(true);

        const handleClick = async() => {
          setOpen(!open);
        };
  return(<>

<div className="Sidebar_banks_seperator"/>
        <ListItem onClick={() => {
                  handleClick()
                  dispatch(pageswitch("Account"))

                  dispatch(bankswitch(props.grpid))
                dispatch(accountswitch(actid))
                }
              } button className={classes.nested}>
          <ListItemIcon >
            <LocalAtmIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>



{/*    <div onClick={() =>{
          dispatch(pageswitch("Account"))

          dispatch(bankswitch(bank))
        dispatch(accountswitch(name))
        }
      } className={`Sidebar_banks_account_${props.actview}`}>

    <h3>{name}</h3>
    <h3>{Balence}</h3>

    </div> */ }</>);
}
export default Sidebar;
