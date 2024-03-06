import { useState } from "react";
import { BackgroundImage, Box, Flex, Title } from "@mantine/core";

import { useAppSelector } from "@/Stores/Store";
import { User } from "@/Types/SharedTypes";

import ConfirmDeleteClassroomModal from "../ConfirmDeleteClassroomModal/ConfirmDeleteClassroomModal";
import EditClassroomFormModal from "../EditClassroomFormModal/EditClassroomFormModal";
import EditClassroomMenu from "../EditClassroomMenu/EditClassroomMenu";
import ClassroomInformationMenu from "../ClassroomInformationMenu/ClassroomInformationMenu";
import { StreamHeaderParams } from "./StreamHeaderTypes";

const StreamHeader: React.FC<StreamHeaderParams> = ({ classroom }) => {
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [isEditFormModalOpen, setIsEditFormModalOpen] = useState(false);

  const currentUser = useAppSelector((state) => state.auth.user) as User;

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

      {isConfirmDeleteModalOpen ? (
        <ConfirmDeleteClassroomModal
          open={isConfirmDeleteModalOpen}
          close={() => setIsConfirmDeleteModalOpen(false)}
          classroomId={classroom.id}
        />
      ) : null}

      {isEditFormModalOpen ? (
        <EditClassroomFormModal
          open={isEditFormModalOpen}
          close={() => setIsEditFormModalOpen(false)}
          classroom={classroom}
        />
      ) : null}
    </Box>
  );
};

export default StreamHeader;
