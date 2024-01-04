import { Paper, SimpleGrid, Text, Title } from "@mantine/core";

const Upcoming = () => {
  return (
    <Paper
      h={"200"}
      w={"300"}
      py={"xl"}
      ta={"center"}
      radius={"md"}
      withBorder
      mr={"xl"}
      shadow="xl"
    >
      <SimpleGrid>
        <Title order={3} c={"sazim-blue"}>
          Upcoming
        </Title>
        <Text size="sm" mt={10} c="sazim-blue">
          No work due soon
        </Text>
      </SimpleGrid>
    </Paper>
  );
};

export default Upcoming;
