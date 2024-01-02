import { Badge, Button, Card, Flex, Group, Image, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CreateClassroomFormModal from "@/Shared/Components/CreateClassroomFormModal/CreateClassroomFormModal";

const TeacherCards = ({ classrooms }) => {
  const [isClassroomFormModalOpen, setIsClassroomFormModalOpen] =
    useState(false);

  const closeClassroomFormModal = () => {
    setIsClassroomFormModalOpen(false);
  };

  const navigate = useNavigate();

  return (
    <>
      {classrooms.length === 0 ? (
        <Flex justify={"center"} mt={200} h={"100vh"}>
          <Button
            leftSection={<IconPlus />}
            color={"white"}
            variant="light"
            size="lg"
            radius={"lg"}
            onClick={() => setIsClassroomFormModalOpen(true)}
          >
            Create a classroom
          </Button>
          <CreateClassroomFormModal
            open={isClassroomFormModalOpen}
            close={closeClassroomFormModal}
          />
        </Flex>
      ) : (
        <Group justify="space-evenly" gap={"md"} py={"lg"}>
          {classrooms &&
            classrooms.map((classroom) => (
              <Card
                shadow="sm"
                padding="lg"
                my={"md"}
                radius="md"
                key={classroom.id}
                h={330}
                onClick={() => navigate(`/classroom/${classroom.id}/stream`)}
              >
                <Card.Section>
                  <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={160}
                    alt="Classroom Image"
                  />
                </Card.Section>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text size="lg" weight={700} w={200} maw={200}>
                    {classroom.title}
                  </Text>
                  <Badge color="sazim-purple.4" variant="outline" w={130}>
                    {classroom.subject}
                  </Badge>
                </Group>
                <Text size="sm">
                  <strong>Days:</strong> {classroom.days.join(", ")}
                </Text>
                <Text size="sm">
                  <strong>Class Time:</strong>{" "}
                  {new Date(classroom.class_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </Card>
            ))}
        </Group>
      )}
    </>
  );
};

export default TeacherCards;
