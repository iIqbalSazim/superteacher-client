import { Button, Flex, Group, Modal, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconBooks, IconSchool } from "@tabler/icons-react";

const RoleSelectionModal = ({ open, close }) => {
  const navigate = useNavigate();
  return (
    <>
      <Modal opened={open} onClose={close} size={"auto"} py={"xl"} centered>
        <Title ta={"center"} order={2} c={"sazim-blue.7"} mb={"xl"}>
          Choose your role
        </Title>
        <Group justify="space-evenly" m={"md"} mb={"xl"}>
          <Button
            shadow="xl"
            mih={400}
            miw={250}
            variant="outline"
            color={"sazim-blue.7"}
            size="xl"
            onClick={() => navigate("/student")}
          >
            <Flex align={"center"} justify={"center"} mih={"inherit"}>
              <IconBooks />
              Student
            </Flex>
          </Button>
          <Button
            shadow="xl"
            mih={400}
            miw={250}
            variant="outline"
            color={"sazim-blue.7"}
            size="xl"
            onClick={() => navigate("/teacher")}
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
