import { ActionIcon, Flex, Group, SimpleGrid, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

const StudentList = ({ students, currentUser, handleRemoveStudent }) => {
  return (
    <SimpleGrid>
      {students.map((student) => (
        <Flex key={student.id} justify={"space-between"}>
          <Text>
            {student.first_name} {student.last_name}{" "}
            {currentUser.role === "student" &&
            student.email === currentUser.email
              ? "(you)"
              : null}
          </Text>
          <Group>
            <Text>{student.email}</Text>
            {currentUser.role === "teacher" ? (
              <ActionIcon
                variant="subtle"
                color="sazim-purple"
                onClick={() => handleRemoveStudent(student.id)}
              >
                <IconTrash />
              </ActionIcon>
            ) : null}
          </Group>
        </Flex>
      ))}
    </SimpleGrid>
  );
};

export default StudentList;
