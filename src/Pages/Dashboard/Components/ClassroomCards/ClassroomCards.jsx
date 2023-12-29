import { Box, Text } from "@mantine/core";

const ClassroomCards = ({ role }) => {
  return (
    <Box p="lg" mih={"100vh"}>
      {role === "teacher" ? (
        <Text>Teacher Cards</Text>
      ) : (
        <Text>Student Cards</Text>
      )}
    </Box>
  );
};

export default ClassroomCards;
