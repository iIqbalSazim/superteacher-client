import { useNavigate } from "react-router-dom";
import { Button, Group } from "@mantine/core";

import { AuthOptionsProps } from "./AuthOptionTypes";

const AuthOptions: React.FC<AuthOptionsProps> = ({
  setIsRoleSelectionModalOpen,
}) => {
  const navigate = useNavigate();

  return (
    <Group mt={40} justify="space-between" gap="lg">
      <Button
        onClick={() => setIsRoleSelectionModalOpen(true)}
        color="sazim-green.5"
        variant="outline"
        size="lg"
      >
        Register
      </Button>
      <Button
        onClick={() => navigate("/login")}
        color="sazim-green.5"
        variant="outline"
        size="lg"
      >
        Login
      </Button>
    </Group>
  );
};

export default AuthOptions;
