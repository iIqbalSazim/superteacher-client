import { Flex, Group, Title } from "@mantine/core";

import { useAppSelector } from "@/Stores/Store";
import { User } from "@/Types/SharedTypes";

import { CardsContainerProps } from "./CardsContainerTypes";
import ClassroomCard from "../ClassroomCard/ClassroomCard";
import CreateClassroomButton from "../CreateClassroomButton/CreateClassroomButton";

const CardsContainer: React.FC<CardsContainerProps> = ({ classrooms }) => {
  const currentUser = useAppSelector((state) => state.auth.user) as User;

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
              <ClassroomCard classroom={classroom} key={classroom.id} />
            ))}
        </Group>
      )}
    </>
  );
};

export default CardsContainer;
