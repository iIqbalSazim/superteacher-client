import { useSelector } from "react-redux";
import {
  ActionIcon,
  Card,
  Flex,
  Group,
  Menu,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconClipboardText, IconDots } from "@tabler/icons-react";

import { formatDate } from "../../ClassworkHelpers";

const FinishedExam = ({ exam, openDeleteExamModal, openUpdateExamModal }) => {
  const currentUser = useSelector((state) => state.auth.user);
  return (
    <Card my={"md"} px={{ base: "xs", sm: "md", md: "lg" }} bg={"gray.6"}>
      <Flex justify="flex-start" wrap="wrap" align="center" gap={"sm"}>
        <ThemeIcon radius={"xl"} variant="light" color="sazim-blue" size={"lg"}>
          <IconClipboardText />
        </ThemeIcon>
        <Title order={4}>{exam.title} (Ended)</Title>

        {currentUser.role === "teacher" ? (
          <Menu shadow="xl" withArrow offset={-3} position="bottom-end">
            <Menu.Target>
              <ActionIcon m={"lg"} variant="transparent" color="sazim-blue">
                <IconDots />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={() => openUpdateExamModal(exam)}>
                Edit
              </Menu.Item>
              <Menu.Item onClick={() => openDeleteExamModal(exam)}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : null}
      </Flex>
      <Text c={"sazim-blue"} my={"md"}>
        {exam.description}
      </Text>

      <Group justify="flex-end" mt={"sm"}>
        <Text>Finished on: {formatDate(exam.date)}</Text>
      </Group>
    </Card>
  );
};

export default FinishedExam;
