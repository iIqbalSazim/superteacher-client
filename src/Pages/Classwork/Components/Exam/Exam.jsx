import { Card, Flex, Group, Text, ThemeIcon, Title } from "@mantine/core";
import { IconClipboardText } from "@tabler/icons-react";

import { formatDate } from "../../ClassworkHelpers";

const Exam = ({ exam }) => {
  return (
    <Card
      key={exam.title}
      my={"md"}
      px={{ base: "xs", sm: "md", md: "lg" }}
      withBorder
    >
      <Flex justify="flex-start" wrap="wrap" gap={"sm"}>
        <ThemeIcon
          radius={"xl"}
          variant="filled"
          color="sazim-blue"
          size={"lg"}
        >
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

export default Exam;
