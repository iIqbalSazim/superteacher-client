/* eslint-disable no-case-declarations */
const INITIAL_STATE = {
  classrooms: [],
  classroomStudents: [],
  classroomResources: [],
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
    case "SET_CLASSROOM_RESOURCES":
      return {
        ...state,
        classroomResources: action.payload,
      };
    case "REMOVE_CLASSROOM":
      const classroomIdToRemove = action.payload;
      const updatedClassroomsAfterRemoval = state.classrooms.filter(
        (classroom) => classroom.id !== classroomIdToRemove
      );
      return {
        ...state,
        classrooms: updatedClassroomsAfterRemoval,
      };
    case "UPDATE_CLASSROOM":
      const updatedClassroom = action.payload;
      const updatedClassrooms = state.classrooms.map((classroom) =>
        classroom.id === updatedClassroom.id ? updatedClassroom : classroom
      );
      return {
        ...state,
        classrooms: updatedClassrooms,
      };
    case "RESET":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default classroomReducer;
