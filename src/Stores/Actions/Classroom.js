export const setAllClassrooms = (classrooms) => ({
  type: "SET_ALL_CLASSROOMS",
  payload: classrooms,
});

export const updateClassrooms = (classroom) => ({
  type: "UPDATE_CLASSROOMS",
  payload: classroom,
});

export const setClassroomStudents = (classroomStudents) => ({
  type: "SET_CLASSROOM_STUDENTS",
  payload: classroomStudents,
});

export const updateClassroomStudents = (classroomStudent) => ({
  type: "UPDATE_CLASSROOM_STUDENTS",
  payload: classroomStudent,
});
