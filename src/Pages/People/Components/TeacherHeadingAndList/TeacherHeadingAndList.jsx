import { Box, Divider, Text, Title } from "@mantine/core";

const TeacherHeadingAndList = ({ classroom, currentUser }) => {
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
