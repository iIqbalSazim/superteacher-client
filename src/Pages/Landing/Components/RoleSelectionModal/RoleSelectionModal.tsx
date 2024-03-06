import { useNavigate } from "react-router-dom";
import { Button, Flex, Group, Modal, Title } from "@mantine/core";
import { IconBooks, IconSchool } from "@tabler/icons-react";

import { RoleSelectionModalProps } from "./RoleSelectionModalTypes";

const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  open,
  close,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Modal opened={open} onClose={close} size={"auto"} py={"xl"} centered>
        <Title ta={"center"} order={2} c={"sazim-blue.7"} mb={"xl"}>
          Choose your role
        </Title>
        <Group justify="space-evenly" m={"md"} mb={"xl"}>
          <Button
            mih={400}
            miw={250}
            variant="outline"
            color={"sazim-blue.7"}
            size="xl"
            onClick={() => navigate("/register/student")}
          >
            <Flex align={"center"} justify={"center"} mih={"inherit"}>
              <IconBooks />
              Student
            </Flex>
          </Button>
          <Button
            mih={400}
            miw={250}
            variant="outline"
            color={"sazim-blue.7"}
            size="xl"
            onClick={() => navigate("/register/teacher")}
          >
            <Flex align={"center"} justify={"center"} mih={"inherit"}>
              <IconSchool />
              Teacher
            </Flex>
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default RoleSelectionModal;
