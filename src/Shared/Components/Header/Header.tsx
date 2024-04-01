import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ActionIcon, Anchor, Button, Group, Menu, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import { resetClassroomState } from "@/Shared/Redux/Slices/ClassroomSlice/ClassroomSlice";
import { resetAuthState } from "@/Shared/Redux/Slices/AuthSlice/AuthSlice";
import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { useAppDispatch, useAppSelector } from "@/Shared/Redux/Store";
import { User } from "@/Types/SharedTypes";
import { useLogoutMutation } from "@/Shared/Redux/Api/Auth/auth.api";

import CreateClassroomFormModal from "../CreateClassroomFormModal/CreateClassroomFormModal";

const Header: React.FC = () => {
  const [isClassroomFormModalOpen, setIsClassroomFormModalOpen] =
    useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const closeClassroomFormModal = () => {
    setIsClassroomFormModalOpen(false);
  };

  const currentUser = useAppSelector((state) => state.auth.user) as User;

  const handleProfileClick = async () => {
    navigate(`/profile/${currentUser.id}`);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token") ?? "";

    try {
      await logout({ token: token }).unwrap();

      localStorage.removeItem("token");

      navigate("/");

      setTimeout(() => {
        dispatch(resetClassroomState());
        dispatch(resetAuthState());
      }, 100);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <Group h="100%" p="md" justify="space-between" bg={"sazim-blue.8"}>
      <Anchor component={Link} underline="never" ml={"xs"} to={"/dashboard"}>
        <Title fw={400} order={4} c={"white"}>
          Superteacher
        </Title>
      </Anchor>

      <Group>
        <Anchor
          component={Link}
          underline="never"
          ml={"xs"}
          to={"/dashboard"}
          visibleFrom="xs"
        >
          <Title fw={400} order={5} c={"white"}>
            Dashboard
          </Title>
        </Anchor>
        {currentUser && currentUser.role === "teacher" ? (
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
            <Button color="white" variant={"outline"}>
              {currentUser && currentUser.first_name.slice(0, 12)}
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={handleProfileClick}>Profile</Menu.Item>
            <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};

export default Header;
