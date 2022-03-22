import {useState} from 'react';
import './Add.css';
import { Button, ButtonGroup } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import {Pie, Doughnut} from 'react-chartjs-2';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AttachMoneySharpIcon from '@material-ui/icons/AttachMoneySharp';
import {useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
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
var housing = 0;
var transportation = 0;
var housing = 0;
var transportation = 0;
var food = 0;
var health = 0;
var education = 0;
var misc = 0;
var util = 0;
var transfer = 0;
var Cash = 0;
var Salary = 0;
var Intrest = 0;
var Check = 0;
var Gift = 0;
var misc2 = 0;

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
const reasons=[
  {
    value: 'Housing',
    label: 'Housing',
  },
  {
    value: 'Food',
    label: 'Food',
  },
  {
    value: 'Utilies',
    label: 'Utilies',
  },
  {
    value: 'Transportaion',
    label: 'Transportaion',
  },
  {
    value: 'Healthcare',
    label: 'Healthcare',
  },
  {
    value: 'Education',
    label: 'Education',
  },
  {
    value: 'Misc',
    label: 'Misc',
  },
  {
    value: 'Transfer',
    label: 'Transfer',
  },


]
const reasons2=[
  {
    value: 'Cash',
    label: 'Paycheck',
  },
  {
    value: 'Cash',
    label: 'Cash',

  },
  {
    value: 'Salary',
    label: 'Salary',
  },
  {
    value: 'Intrest',
    label: 'Intrest',
  },
  {
    value: 'Check',
    label: 'Check',

  },
  {
    value: 'Gift',
    label: 'Gift',

  },
  {
    value: 'Misc',
    label: 'Misc',
  }

]

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
    marginBottom: theme.spacing(1),
  },
  button: {
    width: "100%",
    border: 'solid',
    borderWidth: '1px',
    borderColor: 'grey',
    color: 'grey',
    marginBottom: theme.spacing(.5),
    marginTop: theme.spacing(.5),
    '&:hover': {
      backgroundColor: '#ECBA82',
    },
  },
  textField: {
    color: '#ECBA82',
  },
}));


function Account(props) {
  const [open, setOpen] = useState(false);
  const [open6, setOpen6] = useState(false);




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
  const handleClick6 = () => {
     setOpen6(true);
   };

   const handleClose6 = (event, reason) => {
     if (reason === 'clickaway') {
       return;
     }

     setOpen6(false);
   };
const [currency, setCurrency] = useState('Withdrawl');
  const bankid = useSelector(state => state.bank);
  const account = useSelector(state => state.account);
  const  auth = firebase.auth();
  const{uid, photoURL, displayName, email} = auth.currentUser;
  const{name, Balance, mexpenses , mincome , msavings , actid, Irate, owner, type, group} = props.acct;
  const firestore = firebase.firestore();
  const [formValue, setFormValue] = useState('');
  const [switchbtw, setswitchbtw] = useState(true);
  const [formValue2, setFormValue2] = useState('');
  const [formValue3, setFormValue3] = useState('');
  const [formValue4, setFormValue4] = useState('');
  const [reasonValue, setreasonValue] = useState('1');

  const [AddSub, setAddSub] = useState(false);
  var plusminus = '+';
  var numbal = parseFloat(Balance);
  var msbal = parseFloat(msavings);
  var mebal = parseFloat(mexpenses);
  var mibal = parseFloat(mincome);
var trnid = '_' + Math.random().toString(36).substr(2, 9);
  const actRef = firestore.collection(`AllUsers/${owner}/groups/${owner}personal/accounts`);
  const transactionRef = firestore.collection(`AllUsers/${owner}/groups/${owner}personal/accounts/${actid}/transactions`);
  const tquery = transactionRef;
  const [transactions] = useCollectionData(tquery, {idField: 'id'});
  const aquery = actRef;
  const [accounts] = useCollectionData(aquery, {idField: 'id'});
  const typetxt = `Type: ${type}`;
  const ownertxt = `Owner: ${owner}`;
  const irtxt = `Intrest rate: ${Irate}`;
  const createatransaction = async(e) => {
    if(formValue == ""|| formValue2 == "" || formValue3==""){

    }else{
  e.preventDefault();
  handleClick6();
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


  updatebal();


        await transactionRef.doc(trnid).set({
            type: formValue ,
            addsub: plusminus,
            amount: formValue2,
            reason: formValue3,
            trnid: trnid,
            memo: formValue4
          })
          setFormValue("");
          setFormValue2("");
          setFormValue3("");
          setFormValue4("");

        }
  }
  const updatebal = async() => {


              await actRef.doc(actid).set({
                name: name,
                actid: actid,
                Balance: numbal,
                mexpenses: mebal,
                mincome: mibal,
                msavings: msbal,
                group: group,
                owner: owner
                })
                setFormValue("");
                setFormValue2("");
                setFormValue3("");

              }
              const state = {
                labels: ['Housing', 'Food', 'Utilies',
                         'Transportaion', 'Healthcare','Education','Misc','Transfer'],
                datasets: [
                  {

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
                    data: [housing, food, util, transportation, health, education, misc, transfer]
                  }
                ]

              }
              const state2 = {
                labels: ['Cash', 'Intrest', 'Check',
                         'Gift', 'Salary','Misc'],
                datasets: [
                  {

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
                    data: [Cash, Intrest, Check, Gift, Salary, misc2,]
                  }
                ]

              }


  if(AddSub){
    plusminus = '-';
  }else{
    plusminus ='+';
  }

  if(actid == account){
    if(switchbtw){
      if(reasonValue=='2'){
    return (

    <>
    <div className="body_tabs">
    <div onClick={()=> setswitchbtw(true)} className="body_tabs_tab">
        <h4></h4>
    </div>
    <div onClick={()=> setswitchbtw(false)} className="body_tabs_tab2">
        <h4></h4>
    </div>
    </div>
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
              <h2>{numbal}</h2>
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
            <h2>{mebal}</h2>
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
            <h2>{mibal}</h2>
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
            <h2>{msbal}</h2>
            <AttachMoneySharpIcon />
          </div>
        </div>
        </Paper>

        </div>
        <div className="body_account_Transactions">
        <Paper   className={classes.root} elevation={5} >
        <p>Add Transaction</p>
        <div className="body_account_Transactions_add">

        <CssTextField
              className={classes.margin}
              id="standard-select-currency"
              select
              label="Select"
              value={formValue}
              onChange={(e) =>{ if(e.target.value=='Withdrawl'){setreasonValue('1')}setFormValue(e.target.value)}}

            >{currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}

              </CssTextField>

            <CssForm fullWidth className={classes.margin} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>

                <OutlinedInput
                  type = "number"
                  color= "#ECBA82"
                  id="outlined-adornment-amount"
                  value={formValue2}
                  onChange={(e) => setFormValue2(e.target.value)}
                  startAdornment={<InputAdornment  position="start">$</InputAdornment>}
                  labelWidth={60}
                />

              </CssForm>

            <CssTextField
                  className={classes.margin}
                  id="standard-select-currency"
                  select
                  label="Select"
                  value={formValue3}
                  onChange={(e) => setFormValue3(e.target.value)}

                >{reasons2.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CssTextField>

            </div>
            <CssForm fullWidth className={classes.memo} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Memo</InputLabel>
                <OutlinedInput

                  color= "#ECBA82"
                  id="outlined-adornment-amount"
                  value={formValue4}
                  onChange={(e) => setFormValue4(e.target.value)}

                  labelWidth={60}
                />
                <Button className={classes.button} onClick={createatransaction} >
                  Add
                </Button>
              </CssForm>
        </Paper>
        <div className="body_account_Transactions_actions">
        <Paper elevation={5}>
        <Snackbar open={open6} autoHideDuration={6000} onClose={handleClose6}>
        <Alert onClose={handleClose6} severity="success">
        Transaction Added!
        </Alert>
        </Snackbar>
        <p>Transactions</p>
        {transactions && transactions.map(tra => <Transactions key ={tra.id}   actid={actid}
           housing={housing} Balance ={Balance} owner={owner} mexpenses={mexpenses}  mincome={mincome}
          msavings={msavings} type2={type} group={group}
    transaction={tra} />)}
        </Paper>
        </div>
        </div>
        </div>
        </Paper>
        </div>


    </>
    )
}else{
  return(<>
    <div className="body_tabs">
    <div onClick={()=> setswitchbtw(true)} className="body_tabs_tab">
        <h4></h4>
    </div>
    <div onClick={()=> setswitchbtw(false)} className="body_tabs_tab2">
        <h4></h4>
    </div>
    </div>
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
              <h2>{numbal}</h2>
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
            <h2>{mebal}</h2>
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
            <h2>{mibal}</h2>
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
            <h2>{msbal}</h2>
            <AttachMoneySharpIcon />
          </div>
        </div>
        </Paper>

        </div>
        <div className="body_account_Transactions">
        <Paper   className={classes.root} elevation={5} >
        <p>Add Transaction</p>
        <div className="body_account_Transactions_add">

        <CssTextField
              className={classes.margin}
              id="standard-select-currency"
              select
              label="Select"
              value={formValue}
              onChange={(e) => {if(e.target.value=='Deposit'){setreasonValue('2')}setFormValue(e.target.value)}}

            >{currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}

              </CssTextField>

            <CssForm fullWidth className={classes.margin} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>

                <OutlinedInput
                  type = "number"
                  color= "#ECBA82"
                  id="outlined-adornment-amount"
                  value={formValue2}
                  onChange={(e) => setFormValue2(e.target.value)}
                  startAdornment={<InputAdornment  position="start">$</InputAdornment>}
                  labelWidth={60}
                />

              </CssForm>

            <CssTextField
                  className={classes.margin}
                  id="standard-select-currency"
                  select
                  label="Select"
                  value={formValue3}
                  onChange={(e) =>  setFormValue3(e.target.value)}

                >{reasons.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CssTextField>

            </div>
            <CssForm fullWidth className={classes.memo} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Memo</InputLabel>
                <OutlinedInput

                  color= "#ECBA82"
                  id="outlined-adornment-amount"
                  value={formValue4}
                  onChange={(e) => setFormValue4(e.target.value)}

                  labelWidth={60}
                />
                <Button className={classes.button} onClick={createatransaction} >
                  Add
                </Button>
              </CssForm>
        </Paper>
        <div className="body_account_Transactions_actions">
        <Paper elevation={5}>
        <Snackbar open={open6} autoHideDuration={6000} onClose={handleClose6}>
        <Alert onClose={handleClose6} severity="success">
        Transaction Added!
        </Alert>
        </Snackbar>
        <p>Transactions</p>
        {transactions && transactions.map(tra => <Transactions key ={tra.id}   actid={actid}
           housing={housing} Balance ={Balance} owner={owner} mexpenses={mexpenses}  mincome={mincome}
          msavings={msavings} type2={type} group={group}
    transaction={tra} />)}
        </Paper>
        </div>
        </div>
        </div>
        </Paper>
        </div>


    </>)
}
  }else{
    return(<>
    <div className="body_tabs">
    <div onClick={()=>{ housing=0;
    transportation = 0;
    housing = 0;

    food = 0;
    health = 0;
    education = 0;
    misc = 0;
    util = 0;
    transfer = 0;

    Cash = 0;
    Salary = 0;
    Intrest = 0;
    Check = 0;
    Gift = 0;
    misc2 = 0;

    setswitchbtw(true)}} className="body_tabs_tab">
        <h4></h4>
    </div>
    <div onClick={()=> setswitchbtw(false)} className="body_tabs_tab2">
        <h4></h4>
    </div>
    </div>
    <div className="body_account_chart">
    <Paper elevation={5} >

    <div className="body_account_chart_dn">

{transactions && transactions.map(tra => <Transactionsgraph key ={tra.id}   actid={actid}
   housing={housing} Balance ={Balance} owner={owner} mexpenses={mexpenses}  mincome={mincome}
  msavings={msavings} type2={type} group={group}
transaction={tra} />)}
<div className="body_account_charts">
  <div className="body_account_charts_chart">
  <h1>Spending</h1>
      <Doughnut
        data={state}

      />
    </div>
    <div className="body_account_charts_chart">
    <h1>Income</h1>
        <Doughnut
          data={state2}

        />
      </div>
</div>
    </div>

    </Paper>
    </div>
    </>)


}
}else{return(<></>)}
}
function Transactions(props) {
  const [open7, setOpen7] = useState(false);
   const [open8, setOpen8] = useState(false);
  const firestore = firebase.firestore();
 const type2 = props.type2;
  const group = useSelector(state => state.bank);
  const account = useSelector(state => state.account);
  const  auth = firebase.auth();
  const{uid, photoURL, displayName, email} = auth.currentUser;
  const {type, addsub, amount, trnid, reason, memo} = props.transaction
  const actid = props.actid;
  const owner = props.owner;
  const actRef = firestore.collection(`AllUsers/${owner}/groups/${owner}personal/accounts`);
  const transactionRef = firestore.collection(`AllUsers/${owner}/groups/${owner}personal/accounts/${actid}/transactions`);
  const tquery = transactionRef;
  var plusminus = '+';
  var numbal = parseFloat(props.Balance);
  var msbal = parseFloat(props.msavings);
  var mebal = parseFloat(props.mexpenses);
  var mibal = parseFloat(props.mincome);
  if(type == "Withdrawl"){
  if(reason=="Housing"){
    housing = housing + parseFloat(amount)/4;
  }else if(reason=="Food"){
      food = food + parseFloat(amount)/4;
  }else if(reason=="Utilies"){
    util = util + parseFloat(amount)/4;
  }else if(reason=="Transportaion"){
    transportation = transportation + parseFloat(amount)/4;
  }else if(reason=="Healthcare"){
    health = health + parseFloat(amount)/4;
  }else if(reason=="Education"){
    education = education + parseFloat(amount)/4;
  }else if(reason=="Misc"){
    misc = misc + parseFloat(amount)/4;
  }
}else if(type == "Deposit"){
  if(reason=="Cash"){
    Cash = Cash + parseFloat(amount)/4;
  }else if(reason=="Intrest"){
      Intrest = Intrest + parseFloat(amount)/4;
  }else if(reason=="Check"){
    Check = Check + parseFloat(amount)/4;
  }else if(reason=="Salary"){
    Salary = Salary + parseFloat(amount)/4;
  }else if(reason=="Gift"){
    Gift = Gift + parseFloat(amount)/4;
  }else if(reason=="Misc"){
    misc2 = misc2 + parseFloat(amount)/4;
  }
}
  const [transactions] = useCollectionData(tquery, {idField: 'id'});
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
  const handleClick7 = () => {
     setOpen7(true);
   };

   const handleClose7 = (event, reason) => {
     if (reason === 'clickaway') {
       return;
     }

     setOpen7(false);
   };
   const handleClick8 = () => {
      setOpen8(true);
    };

    const handleClose8 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen8(false);
    };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [formValue, setFormValue] = useState(amount);
  const [formValue2, setFormValue2] = useState(reason);
  const [formValue3, setFormValue3] = useState(type);
  console.log(type)

const [currency, setCurrency] = useState('Withdrawl');
  const classes = useStyles();
  const [editbtn, seteditbtn] = useState(true);

  const createatransaction = async(e) => {

  e.preventDefault();
  seteditbtn(true);

  if(formValue3 == "Withdrawl"){
    mebal = mebal + parseFloat(formValue);
    msbal = mibal - mebal;
    plusminus = '-';
    numbal = numbal - parseFloat(formValue);
  }else if(formValue3 == "ATM(Deposit)" || formValue3 == "Deposit" ||
   formValue3 == "Online(Deposit)" || formValue3 == "Transfer(To)"){
     mibal = mibal + parseFloat(formValue);
     msbal = mibal - mebal;
     plusminus = '+';
  numbal = numbal + parseFloat(formValue);
}

if(type == "Withdrawl"){
  mebal = mebal - parseFloat(amount);
  msbal = mibal - mebal;

  numbal = numbal + parseFloat(amount);
}else if(formValue3 == "ATM(Deposit)" || type == "Deposit" ||
 formValue3 == "Online(Deposit)" || formValue3 == "Transfer(To)"){
   mibal = mibal - parseFloat(amount);
   msbal = mibal - mebal;

numbal = numbal - parseFloat(amount);
}


  updatebal();


        await transactionRef.doc(trnid).set({
            type: formValue3,
            addsub: plusminus,
            amount: formValue,
            reason: formValue2,
            trnid: trnid,
            memo: memo
          })



        }



    const updatebal = async() => {


                await actRef.doc(actid).set({


                  Balance: numbal,
                  mexpenses: mebal,
                  mincome: mibal,
                  msavings: msbal,
                  group: group,
                  owner: owner
                  },{merge:true})


                }
const deletetransaction = async() => {

  if(type == "Withdrawl"){
    mebal = mebal - parseFloat(formValue);
    msbal = mibal - mebal;

    numbal = numbal + parseFloat(formValue);

  }else if(type == "Deposit" ){
     mibal = mibal - parseFloat(formValue);
     msbal = mibal - mebal;
    numbal = numbal - parseFloat(formValue);
  }
  updatebal();
await transactionRef.doc(trnid).delete().then(() => {
    console.log("Document successfully deleted!");})

                    }

  if(editbtn){


  return(<>
    <div className="body_account_Transactions_add">
    <p className={classes.actions}>{type}</p>
    <p className={classes.actions}>{amount}</p>
    <p className={classes.actions}>{reason}</p>
    <div className={classes.buttons}>
      <EditIcon onClick={() => seteditbtn(false)}/>
    </div>
    <div className={classes.buttons}>
      <CancelIcon onClick={() => deletetransaction()}/>
    </div>

    </div>
<div className="body_seperator"/>
    </>)
  }else{

    return(<>
      <div className="body_account_Transactions_add">
      <CssTextField
            className={classes.margin}

            id="standard-select-currency"
            select
            label="Select"
              placeholder={formValue3}
            value={formValue3}
            onChange={(e) => setFormValue3(e.target.value)}

          >{currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CssTextField>

          <CssForm fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>

              <OutlinedInput
                type = "number"
                color= "#ECBA82"
                id="outlined-adornment-amount"
                placeholder={formValue}
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                startAdornment={<InputAdornment  position="start">$</InputAdornment>}
                labelWidth={60}
              />

            </CssForm>
          <CssTextField
                className={classes.margin}
                id="standard-select-currency"
                select
                label="Select"
                  placeholder={formValue2}
                value={formValue2}
                onChange={(e) => setFormValue2(e.target.value)}

              >{currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CssTextField>

                <div className={classes.buttons}>
                  <EditIcon onClick={() => seteditbtn(true)}/>
                </div>
                <div className={classes.buttons}>
                  <CancelIcon onClick={() => deletetransaction()}/>
                </div>
          </div>
          <Button className={classes.button} onClick={createatransaction} >
            Submit
          </Button>
          <Snackbar open={open7} autoHideDuration={6000} onClose={handleClose7}>
          <Alert onClose={handleClose7} severity="success">
          Transaction Updated!
          </Alert>
          </Snackbar>
          <Snackbar open={open8} autoHideDuration={6000} onClose={handleClose8}>
          <Alert onClose={handleClose8} severity="success">
          Transaction Deleted!
          </Alert>
          </Snackbar>

  <div className="body_seperator"/>
      </>)

  }
}
function Transactionsgraph(props) {

  const firestore = firebase.firestore();
 const type2 = props.type2;
  const group = useSelector(state => state.bank);
  const account = useSelector(state => state.account);
  const  auth = firebase.auth();
  const{uid, photoURL, displayName, email} = auth.currentUser;
  const {type, addsub, amount, reason, memo} = props.transaction
  const actid = props.actid;
  const owner = props.owner;
  const actRef = firestore.collection(`AllUsers/${owner}/groups/${owner}personal/accounts`);
  const transactionRef = firestore.collection(`AllUsers/${owner}/groups/${owner}personal/accounts/${actid}/transactions`);
  const tquery = transactionRef;
  var plusminus = '+';
  var numbal = parseFloat(props.Balance);
  var msbal = parseFloat(props.msavings);
  var mebal = parseFloat(props.mexpenses);
  var mibal = parseFloat(props.mincome);
  if(reason=="Housing"){
    housing = housing + parseFloat(amount)/4;
  }else if(reason=="Food"){
      food = food + parseFloat(amount)/4;
  }else if(reason=="Utilies"){
    util = util + parseFloat(amount)/4;
  }else if(reason=="Transportaion"){
    transportation = transportation + parseFloat(amount)/4;
  }else if(reason=="Healthcare"){
    health = health + parseFloat(amount)/4;
  }else if(reason=="Education"){
    education = education + parseFloat(amount)/4;
  }else if(reason=="Misc"){
    misc = misc + parseFloat(amount)/4;
  }
  const [transactions] = useCollectionData(tquery, {idField: 'id'});
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
  const [formValue, setFormValue] = useState(amount);
  const [formValue2, setFormValue2] = useState(reason);
  const [formValue3, setFormValue3] = useState(type);
  console.log(type)

const [currency, setCurrency] = useState('Withdrawl');
  const classes = useStyles();
  const [editbtn, seteditbtn] = useState(true);

  const createatransaction = async(e) => {

  e.preventDefault();

  if(formValue3 == "Withdrawl"){
    mebal = mebal + parseFloat(formValue);
    msbal = mibal - mebal;
    plusminus = '-';
    numbal = numbal - parseFloat(formValue);
  }else if(formValue3 == "ATM(Deposit)" || formValue3 == "Deposit" ||
   formValue3 == "Online(Deposit)" || formValue3 == "Transfer(To)"){
     mibal = mibal + parseFloat(formValue);
     msbal = mibal - mebal;
     plusminus = '+';
  numbal = numbal + parseFloat(formValue);
}

if(type == "Withdrawl"){
  mebal = mebal - parseFloat(formValue);
  msbal = mibal - mebal;

  numbal = numbal + parseFloat(formValue);
}else if(formValue3 == "ATM(Deposit)" || type == "Deposit" ||
 formValue3 == "Online(Deposit)" || formValue3 == "Transfer(To)"){
   mibal = mibal - parseFloat(formValue);
   msbal = mibal - mebal;

numbal = numbal - parseFloat(formValue);
}


  updatebal();


        await transactionRef.doc(memo).set({
            type: formValue3,
            addsub: plusminus,
            amount: formValue,
            reason: formValue2,
            memo: memo
          })



        }



    const updatebal = async() => {


                await actRef.doc(actid).set({


                  Balance: numbal,
                  mexpenses: mebal,
                  mincome: mibal,
                  msavings: msbal,
                  group: group,
                  owner: owner
                  },{merge:true})


                }
const deletetransaction = async() => {

  if(type == "Withdrawl"){
    mebal = mebal - parseFloat(formValue);
    msbal = mibal - mebal;

    numbal = numbal + parseFloat(formValue);

  }else if(type == "Deposit" ){
     mibal = mibal - parseFloat(formValue);
     msbal = mibal - mebal;
    numbal = numbal - parseFloat(formValue);
  }
  updatebal();
await transactionRef.doc(memo).delete().then(() => {
    console.log("Document successfully deleted!");})

                    }



    return(<>

      </>)


}


export default Account;
