import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classrooms: [],
  classroomStudents: [],
  classroomResources: [],
};

const classroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {
    setAllClassrooms(state, action) {
      state.classrooms = action.payload;
    },
    updateClassrooms(state, action) {
      state.classrooms.push(action.payload);
    },
    removeClassroom(state, action) {
      state.classrooms = state.classrooms.filter(
        (classroom) => classroom.id !== action.payload
      );
    },
    updateClassroom(state, action) {
      const updatedClassroom = action.payload;
      state.classrooms = state.classrooms.map((classroom) =>
        classroom.id === updatedClassroom.id ? updatedClassroom : classroom
      );
    },
    resetClassroomState() {
      return initialState;
    },
  },
});

export const {
  setAllClassrooms,
  updateClassrooms,
  removeClassroom,
  updateClassroom,
  resetClassroomState,
} = classroomSlice.actions;

export default classroomSlice;
