import { Box, Divider, Text, Title } from "@mantine/core";

const TeacherHeadingAndList = ({ classroom }) => {
  return (
    <Box mt={"md"}>
      <Title order={2}>Teacher</Title>
      <Divider my="sm" />
      <Text>
        {classroom.teacher.first_name} {classroom.teacher.last_name}
      </Text>
    </Box>
  );
};

export default TeacherHeadingAndList;
