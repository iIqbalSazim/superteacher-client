const initialState = {
  classrooms: [],
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
    default:
      return state;
  }
};

export default classroomReducer;
