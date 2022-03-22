import {useState} from 'react';
import './Body.css';
import { Button, ButtonGroup } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import AttachMoneySharpIcon from '@material-ui/icons/AttachMoneySharp';
import Createtheuser from './Createtheuser'
import firebase from 'firebase/app';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import Account from './BodyComponents/Account'
import Bank from './Bank'
import Add from './BodyComponents/Add'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import BallotIcon from '@material-ui/icons/Ballot';
import {useSelector, useDispatch} from 'react-redux';
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


function Body() {
  const [CAname, setCAname] = useState('');
  const [CAbalance, setCAbalence] = useState('');
  const [CAtype, setCAtype] = useState('');
  const [CGname, setCGname] = useState('');
  const [CGtype, setCGtype] = useState('');
  const [JGcode, setJGcode] = useState('');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const handleClickOpen3 = () => {
    setOpen3(true);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
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
  const firestore = firebase.firestore();
  const{uid, photoURL, displayName, email} = auth.currentUser;
  const banksRef = firestore.collection(`AllUsers/${email}/groups`);
  const bquery = banksRef;
  const [banks] = useCollectionData(bquery, {idField: 'id'});
  const actRef = firestore.collection(`AllUsers/${email}/groups/${email}personal/accounts`);
  const aquery = actRef;
  const [acts] = useCollectionData(aquery, {idField: 'id'});
  const dispatch = useDispatch();
  const page = useSelector(state => state.page);

  if(page == "Bank"){
    return (


  <div className="body">
  <Createtheuser />
  <div className="body_tabs">
  <div className="body_tabs_tab">
      <h4></h4>
  </div>
  


  </div>
  <div>

      </div>

  {banks && banks.map(bnk => <Bank key ={bnk.id} bank={bnk} />)}
  </div>
  );
}else if(page == "Account"){
  console.log('hebjkjkre');
    return (


  <div className="body">
  <Createtheuser />


    {acts && acts.map(act => <Account key ={act.id} acct={act} />)}
  </div>
  );

}else if(page == "Add"){
    return (


  <div className="body">
  <Createtheuser />
  <div className="body_tabs">
  <div className="body_tabs_tab">
      <h4></h4>
  </div>



  </div>
  <div>
      {/*  <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
            <div className="body_dia">
            <CssForm fullWidth className={classes.dialogs} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput

                  color= "#ECBA82"
                  id="outlined-adornment-amount"
                  value={values.amount}
                  onChange={handleChange('amount')}

                  labelWidth={60}
                />
              </CssForm>
            <CssTextField
                  className={classes.margin}

                  id="standard-select-currency"
                  select
                  label="Select"
                  value={currency}
                  onChange={handleChange}

                >{currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CssTextField>
                  <CssForm fullWidth className={classes.margin} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                      <OutlinedInput

                        color= "#ECBA82"
                        id="outlined-adornment-amount"
                        value={values.amount}
                        onChange={handleChange('amount')}
                        startAdornment={<InputAdornment  position="start">$</InputAdornment>}
                        labelWidth={60}
                      />
                    </CssForm>
          </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} >
              Cancel
            </Button>
            <Button onClick={handleClose} >
              Add Account
            </Button>
          </DialogActions>
        </Dialog>
      */}
      </div>
  <Add />
  </div>
  );
}else{
  return(<>
    <div className="body">
    <Createtheuser />
    <div className="body_tabs">
    <div className="body_tabs_tab">
        <h4></h4>
    </div>
    
    </div>
    <Add />
    </div>
    </>)
}

}

export default Body;
