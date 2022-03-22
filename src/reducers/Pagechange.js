const pageReducer =(state = "changepage", action) => {
  switch(action.type){
    case "changepage":
     return action.pageto;


    default:
    return state;
  }
}
export default pageReducer;
