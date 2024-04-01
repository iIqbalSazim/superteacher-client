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

import { useAppSelector } from "@/Shared/Redux/Store";
import { User } from "@/Types/SharedTypes";

import { formatDate } from "../../ClassworkHelpers";
import { ScheduledExamProps } from "./ScheduledExamTypes";

const ScheduledExam: React.FC<ScheduledExamProps> = ({
  exam,
  openUpdateExamModal,
  openDeleteExamModal,
}) => {
  const currentUser = useAppSelector((state) => state.auth.user) as User;

  return (
    <>
      <Card my={"md"} px={{ base: "xs", sm: "md", md: "lg" }}>
        <Flex justify="flex-start" wrap="wrap" align="center" gap={"sm"}>
          <ThemeIcon
            radius={"xl"}
            variant="light"
            color="sazim-blue"
            size={"lg"}
          >
            <IconClipboardText />
          </ThemeIcon>
          <Title order={4}>{exam.title}</Title>

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
          <Text>Scheduled for: {formatDate(exam.date)}</Text>
          {formatDate(Date.now()) > formatDate(exam.date) ? (
            <Text>Scheduled for: {formatDate(exam.date)}</Text>
          ) : null}
        </Group>
      </Card>
    </>
  );
};

export default ScheduledExam;
