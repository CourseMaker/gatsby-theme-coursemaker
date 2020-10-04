import {
  bakeLocalStorage,
  deleteLocalStorage,
  readLocalStorage,
} from "../helpers/storage";

export default (state = readLocalStorage("school"), action) => {
  let newState;

  // Check to see what type of action is being fired
  switch (action.type) {
    case "ADD_SCHOOL_DATA":
      newState = {
        school: action.payload,
      };
      bakeLocalStorage("school", newState);
      return newState;
    default:
      return state;
  }
};
