const anonReducer =(state = "changeanon", action) => {
  switch(action.type){
    case "changeanon":
     return action.Anon;


    default:
    return state;
  }
}
export default anonReducer;
