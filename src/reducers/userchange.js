const userReducer =(state = "changeuser", action) => {
  switch(action.type){
    case "changeuser":
     return action.User_Name;

    default:
    return state;
  }
}
export default userReducer;
