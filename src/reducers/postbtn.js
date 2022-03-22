const postbtnReducer =(state = "changepostbtn", action) => {
  switch(action.type){
    case "changepostbtn":
     return action.Postbtn;


    default:
    return state;
  }
}
export default postbtnReducer;
