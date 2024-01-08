import {
  ActionIcon,
  BackgroundImage,
  Flex,
  Group,
  Menu,
  Title,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { useState } from "react";

import ConfirmDeleteClassroomModal from "../ConfirmDeleteClassroomModal/ConfirmDeleteClassroomModal";
import EditClassroomFormModal from "../EditClassroomFormModal/EditClassroomFormModal";

const StreamHeader = ({ classroom, setClassroom }) => {
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [isEditFormModalOpen, setIsEditFormModalOpen] = useState(false);

  const closeDeleteModal = () => {
    setIsConfirmDeleteModalOpen(false);
  };

  const closeEditFormModal = () => {
    setIsEditFormModalOpen(false);
  };

  return (
    <Flex mx="auto" mih={"300"}>
      <BackgroundImage
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
        radius={"md"}
      >
        <Group justify="space-between" align="flex-start">
          <Flex
            justify={"flex-end"}
            direction={"column"}
            mih="300"
            ml="xl"
            mb={"sm"}
          >
            <Title fw={700} mb={10} tt={"uppercase"}>
              {classroom.title}
            </Title>
          </Flex>

          <Menu shadow="xl" withArrow offset={-3} position="bottom-end">
            <Menu.Target>
              <ActionIcon m={"lg"} variant="transparent" color="white">
                <IconDots />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={() => setIsEditFormModalOpen(true)}>
                Edit
              </Menu.Item>
              <Menu.Item onClick={() => setIsConfirmDeleteModalOpen(true)}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
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
    </Flex>
  );
};

export default StreamHeader;
