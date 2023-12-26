import { useParams } from "react-router-dom";

import StudentForm from "./Components/StudentForm/StudentForm";
import TeacherFormContainer from "./Components/TeacherFormContainer/TeacherFormContainer";

const Registration = () => {
  const { role } = useParams();

  return (
    <>
      {role === "student" ? <StudentForm /> : null}
      {role === "teacher" ? <TeacherFormContainer /> : null}
    </>
  );
};

export default Registration;
