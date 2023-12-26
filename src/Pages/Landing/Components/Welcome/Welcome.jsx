import { Box, Text, Title } from "@mantine/core";

const Welcome = () => {
  return (
    <Box color="white" ta={"center"}>
      <Title order={1} c="white" tt="uppercase">
        Welcome to Superteacher
      </Title>
      <Text mt={"20"} c="white">
        Where learning and teaching come together!
      </Text>
    </Box>
  );
};

export default Welcome;
