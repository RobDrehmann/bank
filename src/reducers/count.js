const countReducer =(state = 0, action) => {
  switch(action.type){
    case `ADD`:
     return state + action.nr;


      case `Reset`:
       return state * 0;


    default:
    return state;
  }
}
export default countReducer;
