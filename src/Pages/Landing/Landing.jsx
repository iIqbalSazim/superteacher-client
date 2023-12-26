import { useState } from "react";
import { Flex } from "@mantine/core";

import Welcome from "./Components/Welcome/Welcome";
import RoleSelectionModal from "./Components/RoleSelectionModal/RoleSelectionModal";
import AuthOptions from "./Components/AuthOptions/AuthOptions";

const Landing = () => {
  const [isRoleSelectionModalOpen, setIsRoleSelectionModalOpen] =
    useState(false);

  const closeRoleSelectionModal = () => {
    setIsRoleSelectionModalOpen(false);
  };

  return (
    <Flex justify="center" align="center" direction="column" mih={"100vh"}>
      <Welcome />
      <AuthOptions setIsRoleSelectionModalOpen={setIsRoleSelectionModalOpen} />
      <RoleSelectionModal
        open={isRoleSelectionModalOpen}
        close={closeRoleSelectionModal}
      />
    </Flex>
  );
};

export default Landing;
