const ratebtnReducer =(state = "changeratebtn", action) => {
  switch(action.type){
    case "changeratebtn":
     return action.Ratebtn;

    default:
    return state;
  }
}
export default ratebtnReducer;
