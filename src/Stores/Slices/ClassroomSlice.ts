import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ClassroomType } from "@/Types/SharedTypes";

import { ClassroomState } from "../Types/ClassroomSliceTypes";

const initialState: ClassroomState = {
  classrooms: [],
};

const classroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {
    setAllClassrooms: (state, action: PayloadAction<ClassroomType[]>) => {
      state.classrooms = action.payload;
    },
    updateClassrooms: (state, action: PayloadAction<ClassroomType>) => {
      state.classrooms = [...state.classrooms, action.payload];
    },
    removeClassroom: (state, action: PayloadAction<number>) => {
      state.classrooms = state.classrooms.filter(
        (classroom) => classroom.id !== action.payload
      );
    },
    updateClassroom: (state, action: PayloadAction<ClassroomType>) => {
      const updatedClassroom = action.payload;
      state.classrooms = state.classrooms.map((classroom) =>
        classroom.id === updatedClassroom.id ? updatedClassroom : classroom
      );
    },
    resetClassroomState: () => {
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
