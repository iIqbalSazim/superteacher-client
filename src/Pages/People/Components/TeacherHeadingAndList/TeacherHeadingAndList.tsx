import { Box, Divider, Text, Title } from "@mantine/core";

import { useAppSelector } from "@/Stores/Store";
import { User } from "@/Types/SharedTypes";

import { TeacherHeadingAndListProps } from "./TeacherHeadingAndListTypes";

const TeacherHeadingAndList: React.FC<TeacherHeadingAndListProps> = ({
  classroom,
}) => {
  const currentUser = useAppSelector((state) => state.auth.user) as User;
  return (
    <Box mt={"md"}>
      <Title order={2}>Teacher</Title>
      <Divider my="sm" />
      <Text>
        {classroom.teacher.first_name} {classroom.teacher.last_name}{" "}
        {currentUser.role === "teacher" &&
        classroom.teacher.email === currentUser.email
          ? "(you)"
          : null}
      </Text>
    </Box>
  );
};

export default TeacherHeadingAndList;
