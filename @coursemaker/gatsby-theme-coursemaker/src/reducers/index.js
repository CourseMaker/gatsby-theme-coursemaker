import { combineReducers } from "redux";

import CourseReducer from "./course";
import SchoolReducer from "./school";
export default combineReducers({
  course: CourseReducer,
  school: SchoolReducer,
});
