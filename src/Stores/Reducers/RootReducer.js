import { combineReducers } from "redux";

import AuthReducer from "./Auth";
import classroomReducer from "./Classroom";

const RootReducer = combineReducers({
  auth: AuthReducer,
  classroom: classroomReducer,
});

export default RootReducer;
