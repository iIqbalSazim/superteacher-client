import { ActionIcon, Flex, Title } from "@mantine/core";
import { IconSquareRoundedPlus } from "@tabler/icons-react";

import { useAppSelector } from "@/Shared/Redux/Store";
import { User } from "@/Types/SharedTypes";

import { StudentHeadingAndAddButtonProps } from "./StudentHeadingAndAddButtonTypes";

const StudentHeadingAndAddButton: React.FC<StudentHeadingAndAddButtonProps> = ({
  setIsAddStudentModalOpen,
}) => {
  const currentUser = useAppSelector((state) => state.auth.user) as User;
  return (
    <Flex align={"center"} justify={"space-between"} mt={"xl"}>
      <Title order={2}>Students</Title>
      {currentUser.role === "teacher" ? (
        <ActionIcon
          variant="subtle"
          color="sazim-green"
          onClick={() => setIsAddStudentModalOpen(true)}
        >
          <IconSquareRoundedPlus />
        </ActionIcon>
      ) : null}
    </Flex>
  );
};

export default StudentHeadingAndAddButton;
