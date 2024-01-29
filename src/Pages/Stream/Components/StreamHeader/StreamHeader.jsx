import { useState } from "react";
import { useSelector } from "react-redux";
import { BackgroundImage, Box, Flex, Title } from "@mantine/core";

import ConfirmDeleteClassroomModal from "../ConfirmDeleteClassroomModal/ConfirmDeleteClassroomModal";
import EditClassroomFormModal from "../EditClassroomFormModal/EditClassroomFormModal";
import EditClassroomMenu from "../EditClassroomMenu/EditClassroomMenu";
import ClassroomInformationMenu from "../ClassroomInformationMenu/ClassroomInformationMenu";

const StreamHeader = ({ classroom, setClassroom }) => {
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [isEditFormModalOpen, setIsEditFormModalOpen] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);

  const closeDeleteModal = () => {
    setIsConfirmDeleteModalOpen(false);
  };

  const closeEditFormModal = () => {
    setIsEditFormModalOpen(false);
  };

  return (
    <Box mx="auto" mih={"300"}>
      <BackgroundImage
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
        radius={"md"}
      >
        <Flex justify="space-between" mih={"300"}>
          <Flex
            justify={"flex-end"}
            direction={"column"}
            ml={{ base: "md", sm: "xl" }}
            mb={"sm"}
          >
            <Title fw={700} tt={"uppercase"} visibleFrom="xs">
              {classroom.title}
            </Title>
            <Title fw={700} tt={"uppercase"} order={2} hiddenFrom="xs">
              {classroom.title}
            </Title>
          </Flex>

          <Flex direction={"column"} justify={"space-between"}>
            {currentUser.role === "teacher" ? (
              <EditClassroomMenu
                setIsConfirmDeleteModalOpen={setIsConfirmDeleteModalOpen}
                setIsEditFormModalOpen={setIsEditFormModalOpen}
              />
            ) : null}

            <ClassroomInformationMenu classroom={classroom} />
          </Flex>
        </Flex>
      </BackgroundImage>

      <ConfirmDeleteClassroomModal
        open={isConfirmDeleteModalOpen}
        close={closeDeleteModal}
        classroomId={classroom.id}
        setClassroom={setClassroom}
      />
      <EditClassroomFormModal
        open={isEditFormModalOpen}
        close={closeEditFormModal}
        classroom={classroom}
        setClassroom={setClassroom}
      />
    </Box>
  );
};

export default StreamHeader;
