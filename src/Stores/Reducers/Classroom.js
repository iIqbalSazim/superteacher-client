const initialState = {
  classrooms: [],
  classroomStudents: [],
};

const classroomReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default classroomReducer;
