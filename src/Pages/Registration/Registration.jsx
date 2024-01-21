import { Navigate, useParams } from "react-router-dom";

import StudentForm from "./Components/StudentForm/StudentForm";
import TeacherForm from "./Components/TeacherForm/TeacherForm";

const Registration = () => {
  const { role } = useParams();

  if (role === "student") {
    return <StudentForm />;
  } else if (role === "teacher") {
    return <TeacherForm />;
  } else {
    return <Navigate to="/" />;
  }
};

export default Registration;
