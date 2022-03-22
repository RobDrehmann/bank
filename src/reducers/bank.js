const bankReducer =(state = "changebank", action) => {
  switch(action.type){
    case "changebank":
     return action.Bank;

    default:
    return state;
  }
}
export default bankReducer;
