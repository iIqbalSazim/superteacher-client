import { Navigate, useParams } from "react-router-dom";

import StudentForm from "./Components/StudentForm/StudentForm";
import TeacherFormContainer from "./Components/TeacherFormContainer/TeacherFormContainer";

const Registration = () => {
  const { role } = useParams();

  if (role === "student") {
    return <StudentForm />;
  } else if (role === "teacher") {
    return <TeacherFormContainer />;
  } else {
    return <Navigate to="/" />;
  }
};

export default Registration;
