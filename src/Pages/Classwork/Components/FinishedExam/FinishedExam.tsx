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
import {
  IconClipboardText,
  IconDots,
  IconInfoSquareRounded,
} from "@tabler/icons-react";

import { useAppSelector } from "@/Stores/Store";
import { User } from "@/Types/SharedTypes";

import { formatDate } from "../../ClassworkHelpers";
import { FinishedExamProps } from "./FinishedExamTypes";

const FinishedExam: React.FC<FinishedExamProps> = ({
  exam,
  openDeleteExamModal,
  openUpdateExamModal,
}) => {
  const currentUser = useAppSelector((state) => state.auth.user) as User;
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
              <ActionIcon m={"lg"} variant="transparent" color="white">
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

      <Group justify="space-between" align="center">
        <Menu
          shadow="xl"
          position="bottom-start"
          withArrow
          arrowPosition="center"
        >
          <Menu.Target>
            <ActionIcon m={"md"} variant="transparent" color="white">
              <IconInfoSquareRounded />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Text size="sm" c="sazim-blue">
              You can reschedule the exam by editing the date.
            </Text>
          </Menu.Dropdown>
        </Menu>
        <Text>Finished on: {formatDate(exam.date)}</Text>
      </Group>
    </Card>
  );
};

export default FinishedExam;
