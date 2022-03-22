import {useState} from 'react';
import './Add.css';
import { Button, ButtonGroup } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import AttachMoneySharpIcon from '@material-ui/icons/AttachMoneySharp';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import BallotIcon from '@material-ui/icons/Ballot';
import {useSelector, useDispatch} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
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
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
  value: 'USD',
  label: '$',
},
{
  value: 'EUR',
  label: '€',
},
{
  value: 'BTC',
  label: '฿',
},
{
  value: 'JPY',
  label: '¥',
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
    width: "7%",
      color: '#ECBA82',
      margin: theme.spacing(1),
      textAlign: "right" ,
  },
  memo: {
    width: "98%",

    marginBottom: theme.spacing(1),
  },
  textField: {
    color: '#ECBA82',
  },
}));



function Add(props) {
  const [CAname, setCAname] = useState('');
  const [CAbalance, setCAbalance] = useState('');
  const [CAtype, setCAtype] = useState('');
  const [CGname, setCGname] = useState('');
  const [CGtype, setCGtype] = useState('');
  const [JGcode, setJGcode] = useState('');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
   const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
     const [open6, setOpen6] = useState(false);
  const handleClickOpen3 = () => {
    setCAnameError(false);
    setCAtypeError(false);
    setCAbalenceError(false);
    setCGnameError(false);
    setJGcodeError(false);
    setOpen3(true);
    setCAname("");
    setCAbalance("");
    setCAtype("");
    setCGname("");
    setCGtype("");
    setJGcode("");
  };
  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleClickOpen2 = () => {
    setCAnameError(false);
    setCAtypeError(false);
    setCAbalenceError(false);
    setCGnameError(false);
    setJGcodeError(false);
    setOpen2(true);
    setCAname("");
    setCAbalance("");
    setCAtype("");
    setCGname("");
    setCGtype("");
    setJGcode("");
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
 const handleClickOpen = () => {
   setCAnameError(false);
   setCAtypeError(false);
   setCAbalenceError(false);
   setCGnameError(false);
   setJGcodeError(false);
   setOpen(true);
   setCAname("");
   setCAbalance("");
   setCAtype("");
   setCGname("");
   setCGtype("");
   setJGcode("");
 };

 const handleClose = () => {
   setOpen(false);
 };
 const handleClick4 = () => {
    setOpen4(true);
  };

  const handleClose4 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen4(false);
  };
  const handleClick5 = () => {
     setOpen5(true);
   };

   const handleClose5 = (event, reason) => {
     if (reason === 'clickaway') {
       return;
     }

     setOpen5(false);
   };
   const handleClick6 = () => {
      setOpen6(true);
    };

    const handleClose6 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen6(false);
    };


  const classes = useStyles();
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [currency, setCurrency] = useState('EUR');

const bank = useSelector(state => state.bank);
const account = useSelector(state => state.account);
const  auth = firebase.auth();
var grpid = '_' + Math.random().toString(36).substr(2, 9);
var actid = '_' + Math.random().toString(36).substr(2, 9);
const{uid, photoURL, displayName, email} = auth.currentUser;
const firestore = firebase.firestore();
const [formValue, setFormValue] = useState('');
const [formValue2, setFormValue2] = useState('');
const [formValue3, setFormValue3] = useState('');
const [formValue4, setFormValue4] = useState('');
const [formValue5, setFormValue5] = useState('');
const [CGnameerror, setCGnameError] = useState(false);
const [CAnameerror, setCAnameError] = useState(false);
const [CAtypeerror, setCAtypeError] = useState(false);
const [CAbalenceerror, setCAbalenceError] = useState(false);
const [JGcodeerror, setJGcodeError] = useState(false);
const AllgrpRef = firestore.collection(`Allgroups`);
const grpRef = firestore.collection(`AllUsers/${email}/groups`);
const gquery = grpRef;
const [groups] = useCollectionData(gquery, {idField: 'id'});
const actRef = firestore.collection(`Allgroups/${email}personal/accounts`);
const act2Ref = firestore.collection(`AllUsers/${email}/groups/${email}personal/accounts`);
const aquery = actRef;
const [accounts] = useCollectionData(aquery, {idField: 'id'});
const createaccounts = async(e) => {
if(CAname==""||CAtype==""|| CAbalance ==""){
  if(CAname==""){
  setCAnameError(true)
}
if(CAtype==""){
  setCAtypeError(true)
}
if(CAbalance==""){
  setCAbalenceError(true)
}

}else{
  handleClose2();
  handleClick6();
e.preventDefault();
      await actRef.doc(actid).set({
          name: CAname,
          owner: email,
          actid: actid,
          Balance: CAbalance,
          mexpenses: '0',
          mincome: '0',
          msavings: '0',

        })

      await act2Ref.doc(actid).set({
          name: CAname,
          Balance: CAbalance,
          type: CAtype,
          owner: email,
          actid: actid,
          mexpenses: '0',
          mincome: '0',
          msavings: '0',
          group: 'personal',
        })
        setCAname("");
        setCAbalance("");
        setCAtype("");
      }

}
const creategroup = async(e) => {
if(CGname==""){
setCGnameError(true);
}else{
  handleClose();
  handleClick4();
  setCGnameError(false);
      e.preventDefault();
            await grpRef.doc(grpid).set({
                name: CGname,
                grpid: grpid,
                balance: "0",
                  type: CGtype,

              })
              await AllgrpRef.doc(grpid).set({
                  name: CGname,
                  grpid: grpid,
                  balance: "0",
                  type: CGtype,
                })
              setCGname("");
              setCGtype("");
            }
}
const joingroup = async(e) => {
  if(JGcode==""){
    setJGcodeError(true)
  }else{
  handleClick5();
  handleClose3();
            e.preventDefault();
                  await grpRef.doc(JGcode).set({
                      grpid: JGcode
                    })
                    setJGcode("");

                  }
    }
if(true){
  return (
    <div className="body_account">
<Paper elevation={5} >
  <div className="body_account_home">
    <Paper onClick={handleClickOpen} elevation={5}>
      <h2 >Create Group</h2>
      <AccountBalanceIcon />
    </Paper>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Group</DialogTitle>
      <DialogContent>
        <DialogContentText>

        </DialogContentText>
        <div className="body_dia">

        <CssForm  fullWidth className={classes.dialogs} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Group Name</InputLabel>
            <OutlinedInput
              error={CGnameerror}
              color= "#ECBA82"
              id="outlined-adornment-amount"
              value={CGname}
              onChange={(e) => {
                 setCGnameError(false); setCGname(e.target.value)}}
              labelWidth={60}

            />

          </CssForm>
          <div className= {`body_dia_error${CGnameerror}`}>
          <p>Required</p>
          </div>
        <CssTextField
              className={classes.margin}
              id="standard-select-currency"
              select
              label="Group Type"
              value={CGtype}
              onChange={(e) => setCGtype(e.target.value)}


            >{currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CssTextField>


      </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} >
          Cancel
        </Button>
        <Button onClick={(e) =>  creategroup(e)}>
          Create
        </Button>

      </DialogActions>
    </Dialog>
    <Snackbar open={open4} autoHideDuration={6000} onClose={handleClose4}>
<Alert onClose={handleClose4} severity="success">
Group Added!
</Alert>
</Snackbar>
<Snackbar open={open5} autoHideDuration={6000} onClose={handleClose5}>
<Alert onClose={handleClose5} severity="success">
Group Joined!
</Alert>
</Snackbar>
<Snackbar open={open6} autoHideDuration={6000} onClose={handleClose6}>
<Alert onClose={handleClose6} severity="success">
Account Added!
</Alert>
</Snackbar>

    <Paper onClick={handleClickOpen2} elevation={5} >
      <h2>Add Account</h2>
      <LocalAtmIcon />
    </Paper>
    <Dialog open={open2} onClose={handleClose2} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>

        </DialogContentText>
        <div className="body_dia">
        <CssForm fullWidth className={classes.dialogs} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Account Nickname</InputLabel>
            <OutlinedInput
             error={CAnameerror}
              color= "#ECBA82"
              id="outlined-adornment-amount"
              value={CAname}
              onChange={(e) => {setCAnameError(false); setCAname(e.target.value)}}
              labelWidth={60}
            />
          </CssForm>
          <div className= {`body_dia_error${CAnameerror}`}>
          <p>Required</p>
          </div>
        <CssTextField
              className={classes.margin}
              error={CAtypeerror}
              id="standard-select-currency"
              select
              label="Account Type"
              value={CAtype}
              onChange={(e) => {setCAtypeError(false); setCAtype(e.target.value)}}

            >{currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CssTextField>
              <div className= {`body_dia_error${CAtypeerror}`}>
              <p>Required</p>
              </div>
              <CssForm fullWidth className={classes.margin} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-amount">Starting Balance</InputLabel>
                  <OutlinedInput
                    error={CAbalenceerror}
                    color= "#ECBA82"
                    id="outlined-adornment-amount"
                    value={CAbalance}
                    onChange={(e) => {setCAbalenceError(false); setCAbalance(e.target.value)}}
                    startAdornment={<InputAdornment  position="start">$</InputAdornment>}
                    labelWidth={60}
                  />
                </CssForm>
                <div className= {`body_dia_error${CAbalenceerror}`}>
                <p>Required</p>
                </div>
      </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose2} >
          Cancel
        </Button>
        <Button onClick={(e) => createaccounts(e)}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  <div className="body_account_home">

    <Paper elevation={5} onClick={handleClickOpen3} >
      <h2>Join Group</h2>
      <BallotIcon />
    </Paper>
    <Dialog open={open3} onClose={handleClose3} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>

        </DialogContentText>
        <div className="body_dia">
        <CssForm fullWidth className={classes.dialogs} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Group Code</InputLabel>
            <OutlinedInput
              error={JGcodeerror}
              color= "#ECBA82"
              id="outlined-adornment-amount"
              value={JGcode}
              onChange={(e) => {setJGcodeError(false); setJGcode(e.target.value)}}
              labelWidth={60}
            />
          </CssForm>
          <div className= {`body_dia_error${JGcodeerror}`}>
          <p>Required</p>
          </div>

      </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose3} >
          Cancel
        </Button>
        <Button onClick={(e) => joingroup(e)} >
          Join
        </Button>
      </DialogActions>
    </Dialog>
    
  </div>
</Paper>
</div>)}else{
  return (





<div className="body_account">
      <Paper elevation={5} >
        <h1>ADD Account</h1>
        <form onSubmit = {createaccounts}>
          <div className="custom-select_addbank" >
          <h5>Account Name:</h5>
          <input value ={formValue}
                        onChange={(e) => setFormValue(e.target.value)}

                        placeholder={`MAIN CHECKING`}/>
          <h5>Starting Balence:</h5>
          <input type="number" value ={formValue2}
                        onChange={(e) => setFormValue2(e.target.value)}

                        placeholder={`0.00 `}/>
          <h5>Account Type:</h5>
          <select onChange={(e) => setFormValue3(e.target.value)}>
            <option value="0">Transaction Type:</option>
            <option value="1">Audi</option>
            <option value="2">BMW</option>
            <option value="3">Citroen</option>
            <option value="4">Ford</option>
            <option value="5">Honda</option>
            <option value="6">Jaguar</option>
            <option value="7">Land Rover</option>
            <option value="8">Mercedes</option>
            <option value="9">Mini</option>
            <option value="10">Nissan</option>
            <option value="11">Toyota</option>
            <option value="12">Volvo</option>
          </select>
          <h5>Owner:</h5>
          <input placeholder={`YOUR NAME`}value ={formValue4} onChange={(e) => setFormValue4(e.target.value)}/>
          <h5>Intrest Rate(optional):</h5>
          <input placeholder={`0`}value ={formValue5} onChange={(e) => setFormValue5(e.target.value)}/>
          <button type='submit' onClick={(e) => createaccounts(e)}>Add Account</button>
        </div>



        </form>
      </Paper>
</div>

)}
}

export default Add;
