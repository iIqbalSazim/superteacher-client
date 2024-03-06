import { useState } from "react";

import LoginForm from "./Components/LoginForm/LoginForm";
import ForgotPasswordModal from "./Components/ForgotPasswordModal/ForgotPasswordModal";

const Login: React.FC = () => {
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState<boolean>(false);
  return (
    <>
      <LoginForm
        openForgotPasswordModal={() => setIsForgotPasswordModalOpen(true)}
      />
      <ForgotPasswordModal
        open={isForgotPasswordModalOpen}
        close={() => setIsForgotPasswordModalOpen(false)}
      />
    </>
  );
};

export default Login;
