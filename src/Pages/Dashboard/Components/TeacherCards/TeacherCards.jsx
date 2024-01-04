import { Flex, Group } from "@mantine/core";

import ClassroomCard from "../ClassroomCard/ClassroomCard";
import CreateClassroomButton from "../CreateClassroomButton/CreateClassroomButton";

const TeacherCards = ({ classrooms }) => {
  return (
    <>
      {classrooms.length === 0 ? (
        <Flex justify={"center"} mt={200} h={"100vh"}>
          <CreateClassroomButton />
        </Flex>
      ) : (
        <Group justify="space-evenly" gap={"md"} py={"lg"}>
          {classrooms &&
            classrooms.map((classroom) => (
              <ClassroomCard classroom={classroom} key={classroom.id} />
            ))}
        </Group>
      )}
    </>
  );
};

export default TeacherCards;
