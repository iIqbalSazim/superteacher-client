import { useState } from "react";

import TeacherForm from "../TeacherForm/TeacherForm";
import RegistrationCodeForm from "../RegistrationCodeForm/RegistrationCodeForm";

const TeacherFormContainer = () => {
  const [isRegistrationCodeValid, setIsRegistrationCodeValid] = useState(false);

  return (
    <>
      {isRegistrationCodeValid ? (
        <TeacherForm />
      ) : (
        <RegistrationCodeForm
          setIsRegistrationCodeValid={setIsRegistrationCodeValid}
        />
      )}
    </>
  );
};

export default TeacherFormContainer;
