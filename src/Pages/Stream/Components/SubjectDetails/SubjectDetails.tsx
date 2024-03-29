import { Paper, SimpleGrid, Text, Title } from "@mantine/core";

import { SubjectDetailsParams } from "./SubjectDetailsTypes";

const SubjectDetails: React.FC<SubjectDetailsParams> = ({ classroom }) => {
  return (
    <Paper
      w={{ base: "300" }}
      py={{ base: "xl" }}
      ta={"center"}
      radius={"md"}
      withBorder
      shadow="xl"
    >
      <SimpleGrid>
        <Title order={3} c={"sazim-blue"}>
          Details
        </Title>
        <Text size="sm" c="sazim-blue">
          Subject: {classroom.subject}
        </Text>
        <Text size="sm" c="sazim-blue">
          Class Time: {new Date(classroom.class_time).toLocaleTimeString()}
        </Text>
        <Text size="sm" c="sazim-blue">
          Days: {classroom.days.join(", ")}
        </Text>
      </SimpleGrid>
    </Paper>
  );
};

export default SubjectDetails;
