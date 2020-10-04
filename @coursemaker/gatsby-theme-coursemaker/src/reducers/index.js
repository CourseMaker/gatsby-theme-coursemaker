import { combineReducers } from "redux";

import CourseReducer from "./course";

export default combineReducers({
  course: CourseReducer,
});
