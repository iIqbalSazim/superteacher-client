import { useState } from "react";
import LoginForm from "./Components/LoginForm/LoginForm";
import ForgotPasswordModal from "./Components/ForgotPasswordModal/ForgotPasswordModal";

const Login = () => {
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
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
