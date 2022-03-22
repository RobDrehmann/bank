const accountReducer =(state = "changeaccount", action) => {
  switch(action.type){
    case "changeaccount":
     return action.Account;

    default:
    return state;
  }
}
export default accountReducer;
