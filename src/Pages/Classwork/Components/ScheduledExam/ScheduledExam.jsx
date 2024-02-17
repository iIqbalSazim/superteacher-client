import { Card, Flex, Group, Text, ThemeIcon, Title } from "@mantine/core";
import { IconClipboardText } from "@tabler/icons-react";

import { formatDate } from "../../ClassworkHelpers";

const ScheduledExam = ({ exam }) => {
  return (
    <Card my={"md"} px={{ base: "xs", sm: "md", md: "lg" }}>
      <Flex justify="flex-start" wrap="wrap" align="center" gap={"sm"}>
        <ThemeIcon radius={"xl"} variant="light" color="sazim-blue" size={"lg"}>
          <IconClipboardText />
        </ThemeIcon>
        <Title order={4}>{exam.title}</Title>
      </Flex>
      <Text c={"sazim-blue"} my={"md"}>
        {exam.description}
      </Text>

      <Group justify="flex-end" mt={"sm"}>
        <Text>Scheduled for: {formatDate(exam.date)}</Text>
      </Group>
    </Card>
  );
};

export default ScheduledExam;
