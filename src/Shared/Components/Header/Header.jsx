import { useState } from "react";
import { useSelector } from "react-redux";
import { ActionIcon, Anchor, Button, Group, Menu, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import CreateClassroomFormModal from "../CreateClassroomFormModal/CreateClassroomFormModal";

const Header = () => {
  const [isClassroomFormModalOpen, setIsClassroomFormModalOpen] =
    useState(false);

  const closeClassroomFormModal = () => {
    setIsClassroomFormModalOpen(false);
  };

  const currentUser = useSelector((state) => state.auth.user);

  return (
    <Group
      h="100%"
      p="md"
      justify="space-between"
      shadow={"xl"}
      bg={"sazim-blue.8"}
    >
      <Group>
        <Anchor component={Link} underline="never" ml={"xs"} to={"/dashboard"}>
          <Title fw={400} order={4} c={"white"}>
            Superteacher
          </Title>
        </Anchor>
      </Group>

      <Group>
        <Anchor component={Link} underline="never" ml={"xs"} to={"/dashboard"}>
          <Title fw={400} order={5} c={"white"}>
            Dashboard
          </Title>
        </Anchor>
        {currentUser.role === "teacher" ? (
          <>
            <ActionIcon
              variant="subtle"
              color="white"
              aria-label="Create classroom"
              onClick={() => setIsClassroomFormModalOpen(true)}
            >
              <IconPlus />
            </ActionIcon>
            <CreateClassroomFormModal
              open={isClassroomFormModalOpen}
              close={closeClassroomFormModal}
            />
          </>
        ) : null}

        <Menu
          shadow="xl"
          transitionProps={{ transition: "pop-top-right", duration: 200 }}
          withArrow
          offset={3}
          position="bottom-end"
        >
          <Menu.Target>
            <Button size="sm" color="white" variant={"outline"}>
              {currentUser.first_name}
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item>Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};

export default Header;
