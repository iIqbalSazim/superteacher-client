import { useSelector } from "react-redux";
import { ActionIcon, Button, Group, Menu, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

const Header = () => {
  const currentUser = useSelector((state) => state.auth.user);

  return (
    <Group
      h="100%"
      p="md"
      justify="space-between"
      shadow={"xl"}
      bg={"sazim-blue.7"}
    >
      <Group>
        <Title fw={400} order={4} c={"white"}>
          Superteacher
        </Title>
      </Group>

      <Group>
        {currentUser.role === "teacher" ? (
          <ActionIcon
            variant="subtle"
            color="white"
            aria-label="Create classroom"
          >
            <IconPlus />
          </ActionIcon>
        ) : null}

        <Menu
          shadow="xl"
          transitionProps={{ transition: "pop-top-right", duration: 200 }}
          withArrow
          offset={3}
          position="bottom-end"
        >
          <Menu.Target>
            <Button size="sm" color="sazim-blue.9">
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
