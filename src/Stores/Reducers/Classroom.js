const INITIAL_STATE = {
  classrooms: [],
  classroomStudents: [],
};

const classroomReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_ALL_CLASSROOMS":
      return {
        ...state,
        classrooms: action.payload,
      };
    case "UPDATE_CLASSROOMS":
      return {
        ...state,
        classrooms: [...state.classrooms, action.payload],
      };
    case "SET_CLASSROOM_STUDENTS":
      return {
        ...state,
        classroomStudents: action.payload,
      };
    case "UPDATE_CLASSROOM_STUDENTS":
      return {
        ...state,
        classroomStudents: [...state.classroomStudents, action.payload],
      };
    case "RESET":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default classroomReducer;
