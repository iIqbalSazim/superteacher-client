import { useSelector } from "react-redux";
import { Flex, Group, Title } from "@mantine/core";

import ClassroomCard from "../ClassroomCard/ClassroomCard";
import CreateClassroomButton from "../CreateClassroomButton/CreateClassroomButton";

const CardsContainer = ({ classrooms }) => {
  const currentUser = useSelector((state) => state.auth.user);

  return (
    <>
      {classrooms.length === 0 ? (
        <Flex justify={"center"} mt={200} h={"100vh"}>
          {currentUser.role === "teacher" ? (
            <CreateClassroomButton />
          ) : (
            <Title order={2}>Not enrolled in any classroom</Title>
          )}
        </Flex>
      ) : (
        <Group justify="space-evenly" gap={"md"} py={"lg"}>
          {classrooms &&
            classrooms.map((classroom) => (
              <ClassroomCard
                classroom={classroom}
                key={classroom.id}
                currentUser={currentUser}
              />
            ))}
        </Group>
      )}
    </>
  );
};

export default CardsContainer;
