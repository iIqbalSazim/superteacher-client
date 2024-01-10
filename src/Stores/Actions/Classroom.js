export const setAllClassrooms = (classrooms) => ({
  type: "SET_ALL_CLASSROOMS",
  payload: classrooms,
});

export const updateClassrooms = (classroom) => ({
  type: "UPDATE_CLASSROOMS",
  payload: classroom,
});

export const removeClassroom = (classroomId) => ({
  type: "REMOVE_CLASSROOM",
  payload: classroomId,
});

export const updateClassroom = (classroomId) => ({
  type: "UPDATE_CLASSROOM",
  payload: classroomId,
});

export const setClassroomStudents = (classroomStudents) => ({
  type: "SET_CLASSROOM_STUDENTS",
  payload: classroomStudents,
});

export const setClassroomResources = (classroomResources) => ({
  type: "SET_CLASSROOM_RESOURCES",
  payload: classroomResources,
});

export const updateClassroomStudents = (classroomStudent) => ({
  type: "UPDATE_CLASSROOM_STUDENTS",
  payload: classroomStudent,
});
