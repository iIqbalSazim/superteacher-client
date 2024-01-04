import { ActionIcon, Flex, Title } from "@mantine/core";
import { IconSquareRoundedPlus } from "@tabler/icons-react";

const StudentHeadingAndAddButton = ({ setIsAddStudentModalOpen }) => {
  return (
    <Flex align={"center"} justify={"space-between"} mt={"xl"}>
      <Title order={2}>Students</Title>
      <ActionIcon
        variant="subtle"
        color="sazim-green"
        onClick={() => setIsAddStudentModalOpen(true)}
      >
        <IconSquareRoundedPlus />
      </ActionIcon>
    </Flex>
  );
};

export default StudentHeadingAndAddButton;
