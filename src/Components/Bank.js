import {useState, useEffect} from 'react';
import {Pie, Doughnut} from 'react-chartjs-2';
import './Bank.css';
import { Button, ButtonGroup } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import AttachMoneySharpIcon from '@material-ui/icons/AttachMoneySharp';
import {useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {pageswitch,ratebtnswitch, ratingreset, ratingadd, accountswitch, bankswitch} from '../actions';
import clsx from 'clsx';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import EditIcon from '@material-ui/icons/Edit';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Dialog from '@material-ui/core/Dialog';
import CancelIcon from '@material-ui/icons/Cancel';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
var y;
var bal55 = 0;
var numbal = 0;
var ms55 = 0;
var msbal = 0;
var me55 = 0;
var mebal = 0;
var mi55 = 0;
var mibal = 0;
const state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
        '#6800B4'
      ],
      hoverBackgroundColor: [
      '#501800',
      '#4B5000',
      '#175000',
      '#003350',
      '#35014F'
      ],
      data: [65, 59, 80, 81, 56]
    }
  ]
}

const CssTextField = withStyles({
  root: {
    '& .MuiInputBase-root': {
      color: 'grey',
      borderBottomColor: 'grey',
    },
    '& .Mui-focused': {
      color: '#ECBA82',
      borderBottomColor: 'grey',
    },
    '& .MuiSelect-icon': {
      color: 'grey',
      borderBottomColor: 'grey',
    },


    '& label.MuiInputLabel-root': {
      color: 'grey',
    },
    '& label.Mui-focused': {
      color: '#ECBA82',
    },
    '& .MuiInput-underline:after': {
      color: '#ECBA82',
      borderBottomColor: '#ECBA82',
    },
    '& .MuiInput-underline:before': {
      color: '#ECBA82',
      borderBottomColor: 'grey',
    },


  },
})(TextField);
const CssForm = withStyles({
  root: {
    '& .MuiTypography-colorTextSecondary': {
      color: 'grey',
      borderBottomColor: 'grey',
      '&: p': {
        color: 'grey',
      },
    },

    '& .MuiInputBase-root': {
      color: 'grey',
      borderBottomColor: 'grey',
    },
    '& .Mui-focused': {
      color: '#ECBA82',
      borderBottomColor: 'grey',
    },
    '& .MuiSelect-icon': {
      color: 'grey',
      borderBottomColor: 'grey',
    },



    '& label.MuiInputLabel-root': {
      color: 'grey',
    },
    '& label.Mui-focused': {
      color: '#ECBA82',
    },
    '& .MuiInput-underline:after': {
      color: '#ECBA82',
      borderBottomColor: '#ECBA82',
    },
    '& .MuiInput-underline:hover': {
      color: '#ECBA82',
      borderBottomColor: 'grey',
    },

    '& .MuiInput-underline:before': {
      color: '#ECBA82',
      borderBottomColor: 'grey',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'grey',
      },
      '&:hover fieldset': {
        borderColor: '#ECBA82',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ECBA82',
      },
    },
  },
})(FormControl);
const currencies = [
{
  value: 'Withdrawl',
  label: 'Withdrawl',
},
{
  value: 'Deposit',
  label: 'Deposit',
},
{
  value: 'Transfer',
  label: 'Transfer',
},

];

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#ECBA82',
    backgroundColor: '#373E40',
  },
  margin: {
    width: "33%",
      color: '#ECBA82',
    marginTop: theme.spacing(3),
      margin: theme.spacing(1),
      '&:hover': {
          borderBottomColor: 'grey',
      },
  },

  actions: {
    width: "31%",
      color: '#ECBA82',
      margin: theme.spacing(1),
  },
  dialogs: {
    width: "95%",
      color: '#ECBA82',
      margin: theme.spacing(1),
  },
  buttons: {
    width: "3.5%",
      color: 'grey',
      margin: theme.spacing(1),
      textAlign: "right" ,
      '&:hover': {
        cursor: 'pointer',
        color: '#ECBA82',
      },
  },
  buttons2: {
    width: "3.5%",
      color: 'grey',
      margin: theme.spacing(1),
      textAlign: "right" ,
      '&:hover': {
        color: '#ECBA82',
      },
  },
  memo: {
    width: "98%",
    margin: theme.spacing(1),

  },
  button: {
    width: "97%",
    border: 'solid',
    borderWidth: '1px',
    borderColor: 'grey',
    color: 'grey',
    margin: theme.spacing(.5),
    marginBottom: theme.spacing(1.5),
    '&:hover': {
      backgroundColor: '#ECBA82',
    },
  },
  textField: {
    color: '#ECBA82',
  },
}));


function Bank(props) {
    const dispatch = useDispatch();
 const rating = useSelector(state => state.rating);
 const ratebtn = useSelector(state => state.ratebtn);
  const [open, setOpen] = useState(false);
  const [open6, setOpen6] = useState(false);


const[ball, setbal] = useState();
const[meball, mesetbal] = useState();
const[miball, misetbal] = useState();
const[msball, mssetbal] = useState();
var x = 0 ;
var x1 = 0 ;
var x2 = 0 ;
var x3 = 0 ;


 const handleClickOpen = () => {
   setOpen(true);
 };

 const handleClose = () => {
   setOpen(false);
 };

  const classes = useStyles();
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const handleClick6 = () => {
     setOpen6(true);
   };

   const handleClose6 = (event, reason) => {
     if (reason === 'clickaway') {
       return;
     }

     setOpen6(false);
   };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

const [currency, setCurrency] = useState('Withdrawl');
  const bankid = useSelector(state => state.bank);
  const account = useSelector(state => state.account);
  const  auth = firebase.auth();
  const{uid, photoURL, displayName, email} = auth.currentUser;
  const{name, Balance, mexpenses ,grpid, mincome , msavings , Irate, Owner, type, group} = props.bank;
  console.log(name);
  const firestore = firebase.firestore();
  const [formValue, setFormValue] = useState('');
  const [formValue2, setFormValue2] = useState('');
  const [formValue3, setFormValue3] = useState('');
  const [formValue4, setFormValue4] = useState('');
  const [formValue5, setFormValue5] = useState('');
  const [formValue6, setFormValue6] = useState(0);
  const [error, seterror] = useState(false);

  const [AddSub, setAddSub] = useState(false);
  var plusminus = '+';

  const grpRef = firestore.collection(`Allgroups/${grpid}/accounts`);
  const transactionRef = firestore.collection(`AllUsers/${email}/groups/${group}/accounts/${name}/transactions`);
  const accountsRef = firestore.collection(`AllUsers/${email}/groups/${email}personal/accounts`);
  const gquery = grpRef;
  const [groups] = useCollectionData(gquery, {idField: 'id'});
  const aquery = accountsRef;
  const [accounts] = useCollectionData(aquery, {idField: 'id'});
  const tquery = transactionRef;
  const [transactions] = useCollectionData(tquery, {idField: 'id'});
  const typetxt = `Type: ${type}`;
  const ownertxt = `Owner: ${Owner}`;
  const irtxt = `Intrest rate: ${Irate}`;
  const createatransaction = async(e) => {
  e.preventDefault();
  if(formValue == "ATM(Withdrawl)" || formValue == "Credit Card" ||
   formValue == "Check" || formValue == "Debit Card" ||
    formValue == "Online Charge" || formValue == "Transfer(From)" ||
  formValue == "Withdrawl"){
    mebal = mebal + parseFloat(formValue2);
    msbal = mibal - mebal;

    plusminus = '-';
    numbal = numbal - parseFloat(formValue2);
  }else if(formValue == "ATM(Deposit)" || formValue == "Deposit" ||
   formValue == "Online(Deposit)" || formValue == "Transfer(To)"){
     mibal = mibal + parseFloat(formValue2);
     msbal = mibal - mebal;
     plusminus = '+';
  numbal = numbal + parseFloat(formValue2);
}





        await transactionRef.doc(formValue4).set({
            type: formValue ,
            addsub: plusminus,
            amount: formValue2,
            reason: formValue3,
            memo: formValue4
          })
          setFormValue("");
          setFormValue2("");
          setFormValue3("");
          setFormValue4("");

        }
  const updatebal = async() => {
    if(formValue5==""){
      seterror(true);
    }else{
      handleClick6();
              await grpRef.doc(formValue).set({
                name:formValue5,
                actid: formValue,
                owner: email,
                Balance: formValue6,
                })
                setFormValue("");
                setFormValue2("");
                setFormValue3("");
                  setFormValue5("");
                  setFormValue(0);
}
              }

  if(AddSub){
    plusminus = '-';
  }else{
    plusminus ='+';
  }





  useEffect(() => {
  if(bankid == grpid){
    groups && groups.forEach(function(element) {
      x1 = x1 + parseFloat(element.msavings);
      x2 =  x2 + parseFloat(element.mexpenses);
       x3 = x3 + parseFloat(element.mincome);

    x = x + parseFloat(element.Balance)

});
mssetbal(x1);
mesetbal(x2);
misetbal(x3);
setbal(x);
}
  })

  if(bankid == grpid){
    bal55 = 0;
    ms55 = 0;
    me55 = 0;
    mi55 = 0;


console.log(y);
  return (

<>

    <div className="body_account">
    <Paper elevation={5} >
    <h1>{name}</h1>
    <div className="body_account_full">
    <div className="body_account_Info">
    <Paper elevation={5} >
      <div className="body_account_Info_all">
      <div className="body_account_Info_all_top">
        <AttachMoneySharpIcon />
        <h3>Balence</h3>
        <AttachMoneySharpIcon />
      </div>
        <div className="body_account_Info_all_bottom">

<h2>{ball}</h2>
          <AttachMoneySharpIcon />
        </div>
      </div>
    </Paper>
    <Paper elevation={5} >
    <div className="body_account_Info_all">
    <div className="body_account_Info_all_topme">
      <AttachMoneySharpIcon />
      <h3>Monthly Expenses</h3>
      <AttachMoneySharpIcon />
    </div>
      <div className="body_account_Info_all_bottomme">
        <h2>{meball}</h2>
        <AttachMoneySharpIcon />
      </div>
    </div>
    </Paper>
    <Paper elevation={5} >
    <div className="body_account_Info_all">
    <div className="body_account_Info_all_topmi">
      <AttachMoneySharpIcon />
      <h3>Monthly Income</h3>
      <AttachMoneySharpIcon />
    </div>
      <div className="body_account_Info_all_bottommi">
        <h2>{miball}</h2>
        <AttachMoneySharpIcon />
      </div>
    </div>
    </Paper>
    <Paper elevation={5} >
    <div className="body_account_Info_all">
    <div className="body_account_Info_all_topms">
      <AttachMoneySharpIcon />
      <h3>Monthly Savings</h3>
      <AttachMoneySharpIcon />
    </div>
      <div className="body_account_Info_all_bottomms">
        <h2>{msball}</h2>
        <AttachMoneySharpIcon />
      </div>
    </div>
    </Paper>

    </div>
    <div className="body_account_Transactions">
    
    <Paper   className={classes.root} elevation={5} >
    <h3>Join Code:   {grpid}</h3>
    <p>Add Account</p>
    <div className="body_account_Transactions_add">
    <CssTextField
          error={error}
          className={classes.memo}
          id="standard-select-currency"
          select
          label="Select"



          onChange={(e) => {
            setFormValue6(e.target.value.Balance)
             setFormValue(e.target.value.actid)
             setFormValue5(e.target.value.name)
             seterror(false)
        }}

        >{accounts && accounts.map(option => (
              <MenuItem key={option.id}   name={option.name} value={option}>
                {option.name}
              </MenuItem>
            ))}
          </CssTextField>



        </div>
        <div className= {`body_account_Transactions_add${error}`}>
        <p>Required</p>
        </div>
          <Button className={classes.button} onClick={updatebal} >
            Add
          </Button>
    </Paper>
    <Snackbar open={open6} autoHideDuration={6000} onClose={handleClose6}>
    <Alert onClose={handleClose6} severity="success">
    Account Added!
    </Alert>
    </Snackbar>
    <div className="body_account_Transactions_actions">
    <Paper elevation={5}>
    <p>Transactions</p>

    {groups && groups.map(grp => <Transactions key ={grp.id}
    group={grp} />)}
    </Paper>
    </div>
    </div>
    </div>





    </Paper>
    </div>


</>
)}else{return(<></>)}
}
function Transactions3(props) {

  const firestore = firebase.firestore();
  const type2 = props.type2;
  const group = useSelector(state => state.bank);
  const account = useSelector(state => state.account);
  const  auth = firebase.auth();
  const{uid, photoURL, displayName, email} = auth.currentUser;
  const {type, addsub, amount, reason, memo} = props.transaction
  const transactionRef = firestore.collection(`AllUsers/${email}/groups/${group}/accounts/${account}/transactions`);
  const tquery = transactionRef;
  const actRef = firestore.collection(`Allgroups/${group}/accounts`);
  var plusminus = '+';
  var numbal = parseFloat(props.Balance);
  var msbal = parseFloat(props.msavings);
  var mebal = parseFloat(props.mexpenses);
  var mibal = parseFloat(props.mincome);


  const classes = useStyles();

  const updatebal = async() => {


              await actRef.doc(props.actid).set({

                Balance: numbal,
                mexpenses: mebal,
                mincome: mibal,
                msavings: msbal,
                group: group
              }, {merge:true})


              }


console.log("checkonme")
updatebal();
  return(<>
    <div className="body_account_Transactions_add">
    <p className={classes.actions}>{type}</p>
    <p className={classes.actions}>{amount}</p>
    <p className={classes.actions}>{reason}</p>


    </div>
<div className="body_seperator"/>
    </>)

}
function Groups(props) {

  const firestore = firebase.firestore();
  const{name, owner} = props.group;
  const accountsRef = firestore.collection(`AllUsers/${owner}/groups/${owner}personal/accounts`);
  const aquery = accountsRef;
  const [accounts] = useCollectionData(aquery, {idField: 'id'});

  return(<>
    {accounts && accounts.map(act => <Grpact key={act.id}
acct={act} actname={name} />)}

    </>);
}
function Grpact(props){
  const dispatch = useDispatch();
  const{name, Balance, mexpenses ,grpid, mincome , msavings , Irate, Owner, type, group} = props.acct;
  const add = () => dispatch(ratingadd(parseFloat(Balance)));

  if(name==props.actname){
    ms55 = ms55 + parseFloat(msavings);
    msbal = ms55/2;
    me55 = me55 + parseFloat(mexpenses);
    mebal = me55/2;
    mi55 = mi55 + parseFloat(mincome);
    mibal = mi55/2;
    bal55= bal55 + parseFloat(Balance);
    numbal = bal55/2;
    

    return(<></>);
  }else{return(<></>)}

}
function Transactions(props) {

  const firestore = firebase.firestore();
  const{name, owner} = props.group;
  const accountsRef = firestore.collection(`AllUsers/${owner}/groups/${owner}personal/accounts`);
  const aquery = accountsRef;
  const [accounts] = useCollectionData(aquery, {idField: 'id'});

  return(<>
    {accounts && accounts.map(act => <Transactions2 key={act.id}
acct={act} actname={name} />)}

    </>);
}
function Transactions2(props){
    const firestore = firebase.firestore();
  const{name, Balance, mexpenses ,grpid, mincome , msavings , Irate, owner, actid, type, group} = props.acct;
  const transactionRef = firestore.collection(`AllUsers/${owner}/groups/${owner}personal/accounts/${actid}/transactions`);
  const tquery = transactionRef;
  const [transactions] = useCollectionData(tquery, {idField: 'id'});

  if(name==props.actname){
console.log("checonthisone")
  return(<>
    {transactions && transactions.map(tra => <Transactions3 key ={tra.id}   actid={actid} name={name}
      Balance ={Balance} owner={owner} mexpenses={mexpenses}  mincome={mincome}
      msavings={msavings} type2={type} group={group}
transaction={tra} />)}</>)}else{return(<></>)};

}


export default Bank;
