import { ActionIcon, Menu, SimpleGrid, Text } from "@mantine/core";
import { IconInfoSquareRounded } from "@tabler/icons-react";

const ClassroomInformationMenu = ({ classroom }) => {
  return (
    <Menu
      shadow="xl"
      position="bottom-end"
      hiddenFrom={"md"}
      offset={-1}
      withArrow
      arrowPosition="center"
    >
      <Menu.Target>
        <ActionIcon m={"md"} variant="transparent" color="white">
          <IconInfoSquareRounded />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown hiddenFrom="md">
        <SimpleGrid p={"xs"}>
          <Text size="sm" c="sazim-blue">
            Subject: {classroom.subject}
          </Text>
          <Text size="sm" c="sazim-blue">
            Class Time: {new Date(classroom.class_time).toLocaleTimeString()}
          </Text>
          <Text size="sm" c="sazim-blue">
            Days: {classroom.days.join(", ")}
          </Text>
        </SimpleGrid>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ClassroomInformationMenu;
