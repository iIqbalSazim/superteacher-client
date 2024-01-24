import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ActionIcon, Anchor, Button, Group, Menu, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

import { reset } from "@/Stores/Actions/Auth";
import { logoutUser } from "@/Pages/Login/Api/LoginMethods";

import CreateClassroomFormModal from "../CreateClassroomFormModal/CreateClassroomFormModal";

const Header = () => {
  const [isClassroomFormModalOpen, setIsClassroomFormModalOpen] =
    useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeClassroomFormModal = () => {
    setIsClassroomFormModalOpen(false);
  };

  const currentUser = useSelector((state) => state.auth.user);

  const handleProfileClick = async () => {
    navigate(`/profile/${currentUser.id}`);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      navigate("/");

      await logoutUser({ token: token });

      localStorage.removeItem("token");

      dispatch(reset());
    } catch (error) {
      let message;
      if (error.data) {
        message = error.data.message;
      } else {
        message = error.message;
      }

      if (message) {
        notifications.show({
          color: "red",
          title: "Error",
          message: message,
        });
      }
    }
  };

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
          <Title fw={400} order={3} c={"white"}>
            Superteacher
          </Title>
        </Anchor>
      </Group>

      <Group>
        <Anchor component={Link} underline="never" ml={"xs"} to={"/dashboard"}>
          <Title fw={400} order={4} c={"white"}>
            Dashboard
          </Title>
        </Anchor>
        {currentUser.role === "teacher" ? (
          <>
            <ActionIcon
              variant="subtle"
              color="white"
              size={"xl"}
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
          size="md"
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
            <Menu.Item onClick={handleProfileClick}>Profile</Menu.Item>
            <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};

export default Header;
