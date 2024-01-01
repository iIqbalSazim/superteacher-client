import { combineReducers } from "redux";

import authReducer from "./Auth";
import classroomReducer from "./Classroom";

const RootReducer = combineReducers({
  auth: authReducer,
  classroom: classroomReducer,
});

export default RootReducer;
