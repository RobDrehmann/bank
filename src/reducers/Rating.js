const RatingReducer =(state = 0, action) => {
  switch(action.type){
    case `ADD`:
     return state + action.number - state;
     case `DIVID`:
      return state / action.number;

      case `Reset`:
       return state * 0;


    default:
    return state;
  }
}
export default RatingReducer;
